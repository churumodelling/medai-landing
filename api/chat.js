/**
 * Vercel Serverless: AI Chat (MiniMax API)
 * Переменная окружения: MINIMAX_API_KEY
 * @see https://platform.minimax.io
 */

const KNOWLEDGE = `
Компания: MedAI Nexus. ИИ для такси и мобильных сервисов.

Услуги и продукты:
1) Nexus Vision — ИИ-анализ заказов и спроса. Прогнозирование спроса и горячих зон, анализ истории заказов, погоды и событий. Подсказывает, где подставлять машины и как распределять водителей. Сокращает простой и повышает выезды на 30–40%.
2) Nexus Flow — автоматизация процессов. Умная диспетчеризация и маршрутизация заказов, автоматическое назначение водителей, интеграция с системой учёта по API. До 40% меньше рутины у диспетчеров, быстрее подача машин.
3) Nexus Predict — аналитика и KPI. Прогноз загрузки по районам и времени суток, мониторинг эффективности водителей и флота в реальном времени. Дашборды для руководства и диспетчеров. Точность прогноза спроса до 92%.
4) Nexus Deploy — аудит и внедрение. Полный цикл: аудит процессов, пилот на части флота, обучение персонала, поэтапное масштабирование. Средний срок от старта до первых результатов — 6 недель.

Мы внедряем ИИ в таксопарки и агрегаторы: умная диспетчеризация, прогноз спроса, маршрутизация. Интеграция в существующие системы без остановки работы сервиса.

Контакты: ответим на запрос с сайта, подготовим дорожную карту внедрения под таксопарк или агрегатор.
`;

const SYSTEM_PROMPT = `Ты консультант компании MedAI Nexus (ИИ для такси).

ПРАВИЛА:
1. Отвечай ТОЛЬКО на основе информации ниже.
2. Не выдумывай цены или услуги — их нет в данных.
3. Если информации нет — скажи "Уточню у команды" и предложи оставить контакт.
4. Отвечай кратко и по делу.
5. На вопросы не по теме компании — вежливо направляй к услугам MedAI.

Данные:
${KNOWLEDGE}`;

async function callMiniMax(userMessage) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) throw new Error('MINIMAX_API_KEY не задан');

  const res = await fetch('https://api.minimax.io/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'M2-her',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_completion_tokens: 1024,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  if (data.base_resp && data.base_resp.status_code !== 0) {
    throw new Error(data.base_resp.status_msg || `API ${data.base_resp.status_code}`);
  }
  const text = data?.choices?.[0]?.message?.content;
  return text || 'Не удалось получить ответ. Попробуйте переформулировать.';
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Только POST' });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Нет сообщения' });
    }

    const response = await callMiniMax(message.trim());
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Ошибка сервера' });
  }
};
