export const config = () => ({
  PORT: +process.env.PORT || 3000,
  JWT_SECRET: process.env.SECRET || "JWT_SECRET",
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: +process.env.DB_PORT || 5432,
    USERNAME: process.env.DB_USERNAME || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres",
    DATABASE_NAME: process.env.DB_DATABASE_NAME || "nest",
  },
});
