const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND: process.env.FRONTEND
}

module.exports = { config };