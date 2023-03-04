import userHelper from '../Helpers/productHelper';
import responseHelper from '../../utils/responseHelper';
import fetch from 'node-fetch';

// import userValidator from '../../v1/validators/userValidator';
import codeHelper from '../../utils/codeHelper';
import DB from '../../utils/db';
import bcrypt from 'bcrypt';
// import transporter from '../../utils/emailConfig';
const saltRounds = 10; //
require('dotenv').config();

class userController {
	static async getProducts(req: any, res: any) {
		try {
			let result = await userHelper.getProducts(req.body);
			responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, result, '');
		} catch (error) {
			console.log(error);
			responseHelper.error(res, error, req.headers.language, '');
		}
	}

	static async getProduct(req: any, res: any) {
		try {
			let id = req.params.id;
			let result = await userHelper.getProduct(req.body, id);
			responseHelper.success(res, 'GET_SINGLE_USER_SUCCESS', req.headers.language, result, '');
		} catch (error) {
			console.log(error);
			responseHelper.error(res, error, req.headers.language, '');
		}
	}

	static async createProduct(req: any, res: any) {
		try {
			let result = await userHelper.createProduct(req.body, req.file);
			responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, result, '');
		} catch (error) {
			console.log(error);
			responseHelper.error(res, error, req.headers.language, '');
		}
	}

	 static async deleteProduct(req: any, res: any) {
		try {
			let id = req.params.id;
			let result = await userHelper.deleteProduct(req.body, id);
			responseHelper.success(res, 'DELETE_PRODUCT_SUCCESS', req.headers.language, result, '');
		} catch (error) {
			console.log(error);
			responseHelper.error(res, error, req.headers.language, '');
		}
	}

	// static async getUser(req: any, res: any) {
	// 	try {
	// 		let id = req.params.id;
	// 		let users = await userHelper.getUser(req.body, id);
	// 		responseHelper.success(res, 'GET_SINGLE_USER_SUCCESS', req.headers.language, users, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async getUserPage(req: any, res: any) {
	// 	try {
	// 		let { page, size } = req.query;
	// 		if (!page) {
	// 			page = 1;
	// 		}
	// 		if (!size) {
	// 			size = 1;
	// 		}
	// 		const limit = parseInt(size);
	// 		const skip = (page - 1) * size;
	// 		let TotalUser: any = await DB.select(`"Users"`, '*', '');
	// 		let user: any = await DB.select(`"Users" ORDER BY id LIMIT ${limit} OFFSET ${skip}`, '*', '');
	// 		responseHelper.success(
	// 			res,
	// 			'GET_USER_SUCCESS',
	// 			req.headers.language,
	// 			{ total: TotalUser.rows.length, page_no: page, size: user.rows.length, user: user },
	// 			''
	// 		);
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async createUser(req: any, res: any) {
	// 	try {
	// 		let users = await userHelper.createUser(req.body);
	// 		responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, users, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async createUserWithFile(req: any, res: any) {
	// 	try {
	// 		let users = await userHelper.createUserWithFile(req.body, req.file);
	// 		responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, users, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async deleteUser(req: any, res: any) {
	// 	try {
	// 		let id = req.params.id;
	// 		let user = await userHelper.deleteUser(req.body, id);
	// 		responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, user, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async updateUser(req: any, res: any) {
	// 	try {
	// 		let id = req.params.id;
	// 		let user = await userHelper.updateUser(req.body, id);
	// 		responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, user, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async signUp(req: any, res: any) {
	// 	try {
	// 		let users = await userHelper.signUp(req.body);
	// 		responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, users, '');
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async signIn(req: any, res: any) {
	// 	//using kotlin API we generate token
	// 	// try {
	// 	// 	const data: any = { username: req.body.username, password: req.body.password };
	// 	// 	const url = await fetch(`https://myair.climecon.fi/api/v1/auth/login`, {
	// 	// 		method: 'post',
	// 	// 		body: JSON.stringify(data),
	// 	// 		headers: { 'Content-Type': 'application/json' }
	// 	// 	});
	// 	// 	const result = await url.json();
	// 	// 	responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, result.token, '');
	// 	// } catch (error) {
	// 	// 	console.log(error);
	// 	// 	responseHelper.error(res, error, req.headers.language, '');
	// 	// }
	// 	//using node we create JWT
	// 	try {
	// 		let token: any;
	// 		const { email, password } = req.body;
	// 		let table = `"user"`;
	// 		let selectParams = '*';
	// 		const users: any = await DB.select(table, selectParams, `email='${email}'`);
	// 		// console.log('USER::::::', users);
	// 		if (users.rows.length === 0) {
	// 			return res.status(401).json({ error: 'email is incorrect' });
	// 		}
	// 		// console.log('signin', users);
	// 		const validPassword = await bcrypt.compare(password, users.rows[0].password);
	// 		// console.log('validpw', validPassword);
	// 		if (!validPassword) {
	// 			return res.status(401).json({ error: 'Incorrect password' });
	// 		} else {
	// 			token = await codeHelper.getJwtToken(users);
	// 			responseHelper.success(
	// 				res,
	// 				'SIGNIN_SUCCESS',
	// 				req.headers.language,
	// 				{
	// 					// email: email,
	// 					auth_token: token
	// 				},
	// 				''
	// 			);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// static async changePassword(req: any, res: any) {
	// 	try {
	// 		const { email, password, new_password } = req.body;
	// 		let table = `"Users"`;
	// 		let selectParams = '*';
	// 		const users: any = await DB.select(table, selectParams, `email='${email}'`);
	// 		if (users.rows.length === 0) {
	// 			return res.status(401).json({ status: 'failed', message: 'Email is incorrect' });
	// 		}
	// 		if (new_password === '') {
	// 			return res.status(401).json({ status: 'failed', message: 'please provide new password' });
	// 		}
	// 		const validpassword = await bcrypt.compare(password, users.rows[0].password);
	// 		// console.log('validpassword', validpassword);
	// 		if (validpassword) {
	// 			// console.log('email and pw is correct');
	// 			let data = {
	// 				password: await bcrypt.hash(new_password, saltRounds)
	// 			};
	// 			const table = `"Users"`;
	// 			const condition = `id = ${users.rows[0].id}`;
	// 			const user = await DB.update(table, condition, data);
	// 			console.log('userrrrrrr', user);
	// 			return res.status(201).json({
	// 				status: 'success',
	// 				message: 'Your Password Changed Successfully',
	// 				user: user
	// 			});
	// 		}
	// 		if (!validpassword) {
	// 			return res.status(401).json({ status: 'failed', message: 'please provide proper password' });
	// 		} else {
	// 			return res.status(401).json({ status: 'failed', message: 'please provide all fields proper' });
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// // static async forgetPassword(req: any, res: any) {
	// // 	try {
	// // 		let token: any;
	// // 		const { email } = req.body;
	// // 		let table = `"Users"`;
	// // 		let selectParams = '*';
	// // 		const user: any = await DB.select(table, selectParams, `email='${email}'`);
	// // 		if (user.rows.length > 0) {
	// // 			// console.log('userssssss', user);
	// // 			token = await codeHelper.getJwtToken(email);
	// // 			const link = `http://127.0.0.1:3000/api/user/reset/${user.rows[0].id}/${token}`;
	// // 			console.log('linkkk', link);
	// // 			//send email
	// // 			const info = await transporter.sendMail({
	// // 				from: process.env.EMAIL_FROM,
	// // 				to: user.rows[0].email,
	// // 				subject: 'Myair - Password Reset Link',
	// // 				html: `<h1><a href=${link}>Click Here</a>&nbsp;To Reset Your Password</h1>`
	// // 			});
	// // 			return res.status(201).json({
	// // 				status: 'success',
	// // 				message: 'Password Reset Email Sent...Please check your mail',
	// // 				info: info,
	// // 				link: link
	// // 			});
	// // 		} else {
	// // 			return res.status(401).json({ status: 'failed', message: 'Please provide proper email' });
	// // 		}
	// // 	} catch (error) {
	// // 		console.log(error);
	// // 		responseHelper.error(res, error, req.headers.language, '');
	// // 	}
	// // }
	// static async userPasswordReset(req: any, res: any) {
	// 	const { password, confirm_password } = req.body;
	// 	const { id, token } = req.params;
	// 	try {
	// 		if (password && confirm_password) {
	// 			if (password !== confirm_password) {
	// 				return res
	// 					.status(401)
	// 					.json({ status: 'failed', message: 'New Password and Confirm Password not same' });
	// 			} else {
	// 				// const hashPassword = bcrypt.hash(password, saltRounds);
	// 				const pw = {
	// 					password: await bcrypt.hash(password, saltRounds)
	// 				};
	// 				const table = `"Users"`;
	// 				const condition = `id = ${id}`;
	// 				// const user = await db.update(table, condition, data);
	// 				const data = await DB.update(table, condition, pw);
	// 				// console.log('datatatata', data);
	// 				return res
	// 					.status(201)
	// 					.json({ status: 'success', message: 'Password Reset Successfully', data: data });
	// 			}
	// 		} else {
	// 			return res.status(401).json({ status: 'failed', message: 'all fields required' });
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		responseHelper.error(res, error, req.headers.language, '');
	// 	}
	// }

	// // static async logout(res: any, req: any) {
	// // 	try {
	// // 	} catch (error) {
	// // 		console.log(error);
	// // 		responseHelper.error(res, error, req.headers.language, '');
	// // 	}
	// // }
}

export default userController;
