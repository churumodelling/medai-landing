# Настройка автодеплоя Vercel (один раз)

Проект **medai-landing** уже создан на Vercel и сайт задеплоен.

Чтобы при каждом `git push` в ветку **master** сайт автоматически обновлялся:

1. Открой **Dashboard**: https://vercel.com/on1082401-6904s-projects/medai-landing  
2. Зайди в **Settings** → **Git**  
3. Нажми **Connect Git Repository** и выбери репозиторий **churumodelling/medai-landing**  
4. В **Production Branch** укажи **master** и сохрани

После этого любой `git push origin master` будет запускать новый деплой.

Текущий прод: **https://medai-landing-pink.vercel.app**

---

## Чат-бот (AI консультант)

На сайте подключён виджет чат-бота ([cursor-ai-chatbot](https://github.com/evgyur/cursor-ai-chatbot)). Чтобы он отвечал:

1. Получи API-ключ: [platform.minimax.io](https://platform.minimax.io)  
2. В Vercel: **Settings** → **Environment Variables** → добавь переменную **MINIMAX_API_KEY** (значение — твой ключ).  
3. Сохрани и сделай **Redeploy** последнего деплоя (или новый push).

Без `MINIMAX_API_KEY` виджет откроется, но на сообщения будет отвечать ошибкой.
