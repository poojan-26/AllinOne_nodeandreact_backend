require('dotenv').config();

function config() {
	let data = {
		host: process.env.HOST || 'localhost',
		port: process.env.PORT,
		user: process.env.POSTGRES_DB_USERNAME,
		password: process.env.POSTGRES_DB_PASSWORD,
		database: process.env.POSTGRES_DB_NAME
	};
	return data;
}

export default config;
