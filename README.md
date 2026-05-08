# GREEN-API Test

Простая HTML-страница для вызова методов GREEN-API без использования React, Vue и backend.

## Реализованные методы

- `getSettings`
- `getStateInstance`
- `sendMessage`
- `sendFileByUrl`

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

1. Откройте терминал в папке проекта.
2. Запустите локальный сервер:
   - `python -m http.server 8080`
   - или `py -m http.server 8080`
3. Откройте страницу: `http://localhost:8080`

## Как пользоваться

1. Введите `idInstance`.
2. Введите `ApiTokenInstance`.
3. Нажмите `getStateInstance`, чтобы проверить статус инстанса.
4. Если в ответе приходит `"stateInstance": "authorized"`, WhatsApp подключен.
5. Для `sendMessage` укажите номер телефона и текст сообщения.
6. Для `sendFileByUrl` укажите номер телефона и ссылку на файл.
7. JSON-ответ GREEN-API отображается в поле `Ответ`.

## API-методы

### `getSettings`

GET:

`https://api.green-api.com/waInstance{idInstance}/getSettings/{ApiTokenInstance}`

### `getStateInstance`

GET:

`https://api.green-api.com/waInstance{idInstance}/getStateInstance/{ApiTokenInstance}`

Нормальный ответ для подключенного инстанса:

```json
{
  "stateInstance": "authorized"
}
```

### `sendMessage`

POST:

`https://api.green-api.com/waInstance{idInstance}/sendMessage/{ApiTokenInstance}`

Body:

```json
{
  "chatId": "77771234567@c.us",
  "message": "Hello Green API"
}
```

### `sendFileByUrl`

POST:

`https://api.green-api.com/waInstance{idInstance}/sendFileByUrl/{ApiTokenInstance}`

Body:

```json
{
  "chatId": "77771234567@c.us",
  "urlFile": "https://example.com/file.png",
  "fileName": "file.png"
}
```

## Что реализовано в коде

- Данные `idInstance` и `ApiTokenInstance` вводятся вручную на странице.
- Номер телефона автоматически приводится к формату `XXXXXXXXXXX@c.us`.
- Ответы API и ошибки отображаются в read-only поле `Ответ`.
- Для `sendFileByUrl` имя файла извлекается из URL автоматически.
- При пустых обязательных полях показывается ошибка в поле ответа.

## Security notes

- `ApiTokenInstance` is not hardcoded in the source code.
- `ApiTokenInstance` is entered manually by the user on the page.
- The token is not stored in `localStorage`, `sessionStorage` or cookies.
- The token is not logged to the browser console.
- The repository contains no real credentials.
- `.env` and other secret files are excluded through `.gitignore`.

## Проверка перед сдачей

- Проверить `getStateInstance` и убедиться, что приходит JSON-ответ.
- Проверить `getSettings` на реальном инстансе.
- Проверить `sendMessage` и убедиться, что в ответе приходит `idMessage`.
- Проверить `sendFileByUrl` и убедиться, что API возвращает успешный ответ.
- Проверить сценарий с пустыми `idInstance` или `ApiTokenInstance`.
- Опубликовать проект на GitHub Pages или Netlify.
- Добавить в итоговую сдачу ссылку на репозиторий, ссылку на опубликованную страницу и скриншоты или короткое видео.
