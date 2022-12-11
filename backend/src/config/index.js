global.AppConfig = {
    BaseDirectory: process.cwd(),
    HOST: process.env.HOST || 'http://localhost:3001',
    PORT: process.env.PORT || 3001,
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
}