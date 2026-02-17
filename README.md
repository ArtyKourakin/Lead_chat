# AI-ассистент 24/7 — лендинг на Next.js

Лендинг из 2 экранов (hero + how it works) с демо-чатом.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте: `http://localhost:3000`

## Сборка

```bash
npm run build
```

Для статического режима Next.js результат будет в папке `out/`.

## Деплой на GitHub Pages (автоматически)

В репозитории уже добавлен workflow: `.github/workflows/deploy-gh-pages.yml`.

### Что сделать один раз

1. Запушить проект в GitHub-репозиторий.
2. Перейти в **Settings → Pages**.
3. В разделе **Build and deployment** выбрать **Source: GitHub Actions**.
4. Убедиться, что рабочая ветка для push — `main`.

После каждого push в `main` сайт будет собираться и публиковаться автоматически.

## Почему это работает на GitHub Pages

- `next.config.ts` настроен в static export режиме (`output: "export"`).
- Для GitHub Actions автоматически подставляются `basePath` и `assetPrefix` из имени репозитория, чтобы ассеты и маршруты работали на URL вида:
  `https://<username>.github.io/<repo-name>/`.
