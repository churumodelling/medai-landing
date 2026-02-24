# Настройка автодеплоя Vercel (один раз)

Проект **medai-landing** уже создан на Vercel и сайт задеплоен.

Чтобы при каждом `git push` в ветку **master** сайт автоматически обновлялся:

1. Открой **Dashboard**: https://vercel.com/on1082401-6904s-projects/medai-landing  
2. Зайди в **Settings** → **Git**  
3. Нажми **Connect Git Repository** и выбери репозиторий **churumodelling/medai-landing**  
4. В **Production Branch** укажи **master** и сохрани

После этого любой `git push origin master` будет запускать новый деплой.

Текущий прод: **https://medai-landing-pink.vercel.app**
