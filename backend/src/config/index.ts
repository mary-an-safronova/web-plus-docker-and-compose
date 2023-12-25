export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === 'develop', // Настройка для автосинхронизации базы данных (не рекомендуется использовать в production).
  },
});
