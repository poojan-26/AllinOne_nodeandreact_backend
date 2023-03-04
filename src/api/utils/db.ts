import { Client } from 'pg';
import promise from 'bluebird';
require('dotenv').config({ path: process.cwd() + '/.env.dev' });

let connection: any;
class DB {
	static getConnection() {
		return new promise((resolve: any, reject: any) => {
			connection = new Client({
				user: process.env.POSTGRES_DB_USERNAME,
				host: process.env.POSTGRES_DB_HOST,
				database: process.env.POSTGRES_DB_NAME,
				password: process.env.POSTGRES_DB_PASSWORD,
				port: process.env.POSTGRES_DB_PORT ? parseInt(process.env.POSTGRES_DB_PORT) : 5432
			});
			connection.connect((err: any) => {
				if (err) {
					console.error('error connecting: ' + err.stack);
					reject('Error while connectiong database !');
				} else {
					console.log('connected to ' + connection.database + ' database');
					resolve('Database Connected !');
				}
			});
		});
	}

	static select(table: any, selectParams: any, condition: any) {
		return new promise((resolve, reject) => {
			let query = `SELECT ${selectParams} FROM ${table}`;
			if (condition) {
				query += ` WHERE ${condition}`;
			}
			console.log('\n\n', query, '\n\n');
			connection.query(query, (error: any, results: any) => {
				if (error) {
					console.log(error);
					reject('DB_ERROR');
				} else {
					resolve(results);
				}
			});
		});
	}

	static insert(table: any, body: any, data: any) {
		return new promise((resolve, reject) => {
			console.log('Insert body');
			let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(${Object.keys(data).map(
				(d, index) => '$' + (index + 1)
			)}) RETURNING *`;
			// let query = `INSERT INTO ${table} SET ? `;// for mysql
			console.log('\n\n', query, '\n\n');
			const data1 = Object.keys(data).map((key) => data[key]);
			connection.query(query, data1, (error: any, results: any) => {
				if (error) {
					console.log(error);
					reject('DB_ERROR');
				} else {
					resolve(results);
				}
			});
		});
	}

	static delete(table: any, condition: any) {
		return new promise((resolve, reject) => {
			let query = `DELETE FROM ${table} WHERE ${condition}`;
			connection.query(query, (error: any, results: any) => {
				if (error) {
					console.log(error);
					reject('DB_ERROR');
				} else {
					resolve(results);
				}
			});
		});
	}

	static update(table: any, condition: any, data: any) {
		return new promise((resolve, reject) => {
			let query = `UPDATE ${table} SET ${Object.entries(data).map(
				(entry) => entry[0] + '=' + (entry[1] == null ? entry[1] : "'" + entry[1] + "'")
			)} WHERE ${condition}`;
			console.log('\n\n', query, '\n\n');
			connection.query(query, (error: any, results: any) => {
				if (error) {
					console.log(error);
					reject('DB_ERROR');
				} else {
					resolve(results);
				}
			});
		});
	}
}
export default DB;
