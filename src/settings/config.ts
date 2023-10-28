export const config = () => ({
  PORT: +process.env.PORT || 3000,
  JWT_SECRET: process.env.SECRET || 'JWT_SECRET',
});
