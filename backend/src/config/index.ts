export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV === 'develop', // Настройка для автосинхронизации базы данных (не рекомендуется использовать в production).
  },
});
