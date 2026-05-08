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
