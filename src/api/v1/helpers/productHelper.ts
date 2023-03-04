import promise from 'bluebird';
import db from '../../utils/db';
import bcrypt from 'bcrypt';
const saltRounds = 10; //

class userHelper {
	static async getProducts(body: any) {
		try {
			let selectParams = '*';
			// let table = `"Users"`;
			let result = await db.select(`"Products" ORDER BY id`, selectParams, '');
			return result;
		} catch (error) {
			console.log(`there was an error ${error}`);
		}
	}

		static async getProduct(body: any, id: any) {
		try {
			let selectParams = '*';
			const table = `"Products"`;
			const condition = `id = ${id}`;
			const user = await db.select(table, selectParams, condition);
			return user;
		} catch (error) {
			console.log(`there was an error ${error}`);
		}
	}

	static async createProduct(body: any, file:any) {
		try {
			// const date = new Date();
			let data = {
				product: body.product,
				productname: body.productname,
				price: body.price,
				description: body.description,
				image: `http://localhost:7000/${file.path}`,
				created_date: new Date(),
				updated_date: new Date()
			};
			const table = `"Products"`;
			let result = await db.insert(table, body, data);
			console.log('dataaaaa', result);
			return result;
		} catch (error) {
			console.log('errrr');
			console.log(`there was an error ${error}`);
		}
	}

	 static async deleteProduct(body: any, id: any) {
		try {
			const table = `"Products"`;
			const condition = `id = ${id}`;
			const result = await db.delete(table, condition);
			return result;
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
