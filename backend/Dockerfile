# Сборка проекта
FROM node:16-alpine AS builder
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json .
# Устанавливаем зависимости
RUN npm ci --no-audit --no-fund
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

# Запуск в окружении без dev-зависимостей
FROM node:16-alpine as production
# Устанавливаем рабочую директорию
WORKDIR /app
# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /app/package*.json .
# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает пропустить dev-зависимости
RUN npm ci --omit=dev --no-audit --no-fund
# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./dist/
# Устанавливаем pm2 глобально
RUN npm i --no-audit --no-fund -g pm2
# Копируем файл экосистемы для pm2
COPY ecosystem.config.js ./
# Экспонируем порт, который будет использоваться сервисом по умолчанию
EXPOSE 3000
# Запускаем приложение
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
