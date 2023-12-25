# Сборка фронтенда
FROM node:16-alpine AS builder
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm ci --no-audit --no-fund
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

# Образ с фронтендом и Nginx
FROM nginx:latest AS production
# Копируем статические файлы фронтенда из этапа 1
COPY --from=builder /app/build /usr/share/nginx/html
# Копируем конфигурацию для Nginx
COPY --from=builder /app/nginx/conf.d /etc/nginx/conf.d
# Экспонируем порт 80, который будет использоваться Nginx
EXPOSE 80
# Команда по умолчанию для запуска Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]