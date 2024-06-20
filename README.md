This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# REACT BASE

Для удобства проверки были добавлены поясняющие комментарии в конце некоторых модулей :)

Перед запуском приложения установите пакеты проекта, находясь в главной директории:

```bash
npm install
# или
yarn install
# или
pnpm install
```

Команды для запуска приложения:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в своем браузере, чтобы развернуть приложение

Также вы можете развернуть локальный сервер, который вам нужен будет для загрузки данных(не забудьте также установить пакеты, находясь в папке simple_api):

```bash
Запускаем сервер командой node server.js (если из корня, то node simple_api/server.js)
```

Дефолтно запускается сервер на http://localhost:3001.

**Кинотеатры**: http://localhost:3001/api/cinemas

**Фильмы**: http://localhost:3001/api/movies - все фильмы http://localhost:3001/api/movies?cinemaId={айдишка кинотеатра} - фильмы в конкретном кинотеатре http://localhost:3001/api/movie?movieId={айдишка фильма} - конкретный фильм

**Отзывы**: http://localhost:3001/api/reviews - все отзывы http://localhost:3001/api/reviews?movieId={айдишка фильма} - отзывы конкретного фильма
