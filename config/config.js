require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.POSTGRES_DB_USERNAME,
        "password": process.env.POSTGRES_DB_PASSWORD,
        "database": process.env.POSTGRES_DB_NAME,
        "host": process.env.POSTGRES_DB_HOST,
        "dialect": "postgres"
    }
}