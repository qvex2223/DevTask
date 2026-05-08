# GREEN-API Test Task

Небольшая HTML-страница для ручной проверки методов GREEN-API без backend и сторонних фреймворков.

## Что сделано

- Реализована страница на `HTML`, `CSS`, `JavaScript`
- Добавлены поля для `idInstance` и `ApiTokenInstance`
- Реализованы методы:
  - `getSettings`
  - `getStateInstance`
  - `sendMessage`
  - `sendFileByUrl`
- Ответ каждого запроса выводится в отдельное read-only поле `Ответ`
- Для отправки сообщений номер автоматически приводится к формату `XXXXXXXXXXX@c.us`
- Для `sendFileByUrl` имя файла берется из URL автоматически
- При пустых обязательных полях показывается ошибка

## Структура проекта

```text
green-api-test/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Запуск

```bash
python -m http.server 8080
```

После запуска страница доступна по адресу:

`http://localhost:8080`

## Security notes

- `ApiTokenInstance` is not hardcoded in the source code.
- `ApiTokenInstance` is entered manually by the user on the page.
- The token is not stored in `localStorage`, `sessionStorage` or cookies.
- The token is not logged to the browser console.
- The repository contains no real credentials.
- `.env` and other secret files are excluded through `.gitignore`.
