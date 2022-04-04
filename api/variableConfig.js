require('dotenv').config({ path: './.env' })


module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT,
    PG_HOST: process.env.PG_HOST, 
    PG_PORT: process.env.PG_PORT, 
    PG_DATABASE: process.env.PG_DATABASE, 
    PG_USER: process.env.PG_USER, 
    PG_PASSWORD: process.env.PG_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || 'fallback',
    JWT_REFRESH: process.env.JWT_REFRESH || 'dev',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 2
  }