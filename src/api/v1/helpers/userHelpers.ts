import promise from 'bluebird';
import db from '../../utils/db';
import bcrypt from 'bcrypt';
const saltRounds = 10; //

class userHelper {
	static async getUsers(body: any) {
		try {
			let selectParams = '*';
			// let table = `"Users"`;
			let user = await db.select(`"Users" ORDER BY id`, selectParams, '');
			return user;
		} catch (error) {
			console.log(`there was an error ${error}`);
		}
	}

	static async signUp(body: any) {
		try {
			let data = {
				firstname: body.firstname,
				lastname: body.lastname,
				email: body.email,
				password: await bcrypt.hash(body.password, saltRounds),
				created_date: new Date(),
				updated_date: new Date()
			};

			const table = `"Users"`;
			let user = await db.insert(table, body, data);
			console.log('dataaaaa', user);
			return user;
		} catch (error) {
			console.log(`there was an error ${error}`);
		}
	}

	// static async getUser(body: any, id: any) {
	// 	try {
	// 		let selectParams = '*';
	// 		const table = `"Users"`;
	// 		const condition = `id = ${id}`;
	// 		const user = await db.select(table, selectParams, condition);
	// 		return user;
	// 	} catch (error) {
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }

	// static async createUser(body: any) {
	// 	try {
	// 		// const date = new Date();
	// 		let data = {
	// 			firstname: body.firstname,
	// 			lastname: body.lastname,
	// 			email: body.email,
	// 			created_at: new Date(),
	// 			updated_at: new Date(),
	// 			password: await bcrypt.hash(body.password, saltRounds),
	// 			type: body.type
	// 		};
	// 		const table = `"Users"`;
	// 		let user = await db.insert(table, body, data);
	// 		console.log('dataaaaa', user);
	// 		return user;
	// 	} catch (error) {
	// 		console.log('errrr');
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }

	// static async createUserWithFile(body: any, file: any) {
	// 	try {
	// 		let data = {
	// 			firstname: body.firstname,
	// 			lastname: body.lastname,
	// 			email: body.email,
	// 			created_at: new Date(),
	// 			updated_at: new Date(),
	// 			file: file.path,
	// 			password: await bcrypt.hash(body.password, saltRounds)
	// 		};
	// 		// console.log('data', data);
	// 		const table = `"Users"`;
	// 		let user = await db.insert(table, body, data);
	// 		console.log('dataaaaa', user);
	// 		return user;
	// 	} catch (error) {
	// 		console.log('eeeeeeeerrrr');
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }

	// static async signUp(body: any) {
	// 	try {
	// 		let data = {
	// 			control_unit_uuid: body.control_unit_uuid,
	// 			created_date: new Date(),
	// 			email: body.email,
	// 			enabled: body.enabled,
	// 			first_name: body.first_name,
	// 			last_name: body.last_name,
	// 			modified_date: new Date(),
	// 			password: await bcrypt.hash(body.password, saltRounds),
	// 			password_last_reset_date: body.password_last_reset_date,
	// 			phone: body.phone,
	// 			username: body.username,
	// 			valid_until: body.valid_until,
	// 			version: body.version
	// 		};

	// 		const table = `"user"`;
	// 		let user = await db.insert(table, body, data);
	// 		console.log('dataaaaa', user);
	// 		return user;
	// 	} catch (error) {
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }

	// static async deleteUser(body: any, id: any) {
	// 	try {
	// 		const table = `"Users"`;
	// 		const condition = `id = ${id}`;
	// 		const user = await db.delete(table, condition);
	// 		return user;
	// 	} catch (error) {
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }

	static async getVerifyUser(body: any, id: any) {
		// try {
		// 	let selectParams = '*';
		// 	const table = `"Users"`;
		// 	const condition = `id = ${id}`;
		// 	const user = await db.select(table, selectParams, condition);
		// 	return user;
		// } catch (error) {
		// 	console.log(`there was an error ${error}`);
		// }
		try {
			// const update_date = new Date().toISOString();
			let data = {
				updated_date: new Date().toISOString(),
				verified: true
			};
			const table = `"Users"`;
			const condition = `id = ${id}`;
			const user = await db.update(table, condition, data);
			return user;
		} catch (error) {
			console.log(`there was an error ${error}`);
		}
	}
	// try {
	// 	// const update_date = new Date().toISOString();
	// 	let data = {
	// 		updated_at: new Date().toISOString(),
	// 		varified: true
	// 	};
	// 	const table = `"Users"`;
	// 	const condition = `email = ${email}`;
	// 	const user = await db.update(table, condition, data);
	// 	return user;
	// } catch (error) {
	// 	console.log(`there was an error ${error}`);
	// }
	// }
	// static async updateUser(body: any, id: any) {
	// 	try {
	// 		// const update_date = new Date().toISOString();
	// 		let data = {
	// 			firstname: body.firstname,
	// 			lastname: body.lastname,
	// 			email: body.email,
	// 			updated_at: new Date().toISOString(),
	// 			password: await bcrypt.hash(body.password, saltRounds),
	// 			type: body.type
	// 		};
	// 		const table = `"Users"`;
	// 		const condition = `id = ${id}`;
	// 		const user = await db.update(table, condition, data);
	// 		return user;
	// 	} catch (error) {
	// 		console.log(`there was an error ${error}`);
	// 	}
	// }
}
export default userHelper;
