import jwt from 'jsonwebtoken';
// import semver from 'semver';
import promise from 'bluebird';

// import config from './config';
import db from './db';
import responseHelper from './responseHelper';
import DB from './db';
require('dotenv').config();

class HeaderValidator {
	// validateHeaders(headers) {
	// 	let error;
	// 	if (!headers.language) {
	// 		error = { param: 'language', type: 'required' };
	// 	} else if (!headers.auth_token) {
	// 		error = { param: 'auth_token', type: 'required' };
	// 	} else if (!headers.web_app_version) {
	// 		if (!headers.device_id) {
	// 			error = { param: 'device_id', type: 'required' };
	// 		} else if (!headers.device_type) {
	// 			error = { param: 'device_type', type: 'required' };
	// 		} else if (headers.device_type === '0' && !headers.ios_app_version) {
	// 			error = 'APP_VERSION_MISSING';
	// 		} else if (headers.device_type === '1' && !headers.android_app_version) {
	// 			error = 'APP_VERSION_MISSING';
	// 		} else if (!headers.os) {
	// 			error = { param: 'os', type: 'required' };
	// 		} else {
	// 			let version = headers.android_app_version ? headers.android_app_version : headers.ios_app_version;
	// 			let currentAppVerision = headers.android_app_version
	// 				? config.androidAppVerision
	// 				: config.iosAppVerision;
	// 			let tmp_version = version.split('.');
	// 			tmp_version = tmp_version.length < 3 ? tmp_version.concat([ '0', '0', '0' ]) : tmp_version;
	// 			tmp_version.splice(3);
	// 			version = tmp_version.join('.');
	// 			if (semver.valid(version) === null) {
	// 				error = 'INVALID_APP_VERSION';
	// 			} else {
	// 				if (semver.satisfies(version, `>= ${currentAppVerision}`)) {
	// 				} else {
	// 					error = 'UPGRADE_APP';
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return error;
	// }

	nonAuthValidation(req: any, res: any, next: any) {
		console.log('======BODY========');
		console.log(req.body);
		// let error = HV.validateHeaders(req.headers)
		// if (error) {
		//   responseHelper.error(res, error, req.headers.language)
		// }
		// console.log('req.headers.auth_token', req.headers.auth_token);
		if (req.headers.auth_token) {
			responseHelper.error(res, 'INVALID_TOKEN', req.headers.language, '');
		} else {
			next();
		}
	}

	async checkDuplicate(req: any, res: any, next: any) {
		console.log('========BODY========');
		console.log(req.body);
		let table = `"Users"`;
		let selectParams = '*';
		const { email } = req.body;
		const user: any = await DB.select(table, selectParams, `email='${email}'`);
		// console.log('length', user.rows.length);
		if (user.rows.length > 0) {
			res.status(400).send({
				message: 'Failed! Email is already in use!'
			});
		} else {
			next();
		}
	}

	async checkAuthUser(req: any, res: any, next: any){
		console.log('========BODY========');
		console.log(req.body);
		let table = `"Users"`;
		let selectParams = `verified`;
		const user: any = await DB.select(table, selectParams, `email='${req.body.email}'`);
		if(user.rows[0].verified === true ){
			next();
		}else{
				res.status(400).send({
				message: 'please verify your email !'
			});
			}
	}

	async checkEmail(req:any, res: any, next: any){
			console.log('========BODY CHECKEMAIL========');
		console.log(req.body);
		let table = `"Users"`;
		let selectParams = '*';
		const { id } = req.params;
		const user: any = await DB.select(table, selectParams, `id='${id}'`);
		// console.log('length', user.rows.length);
		if (user.rows.length > 0) {
			next();
		
		} else {
				res.status(400).send({
				message: "you have't any access, please check your link"
			});
		}
	}

	// async isAdmin(req: any, res: any, next: any) {
	// 	console.log('========BODY========');
	// 	console.log(req.body);
	// 	let table = `"Users"`;
	// 	let selectParams = '*';
	// 	// const { type } = req.body;
	// 	const user: any = await DB.select(table, selectParams, `type='admin'`);
	// 	if (user.rows.length > 0) {
	// 		next();
	// 	} else {
	// 		responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
	// 	}
	// }

	// async isUser(req: any, res: any, next: any) {
	// 	console.log('========BODY========');
	// 	console.log(req.body);
	// 	let table = `"Users"`;
	// 	let selectParams = '*';
	// 	// const { type } = req.body;
	// 	const user: any = await DB.select(table, selectParams, `type='user'`);
	// 	if (user.rows.length > 0) {
	// 		next();
	// 	} else {
	// 		responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
	// 	}
	// }

	//   try{
	//     const token = req.headers.authorization.split(" ")[1];
	//     console.log(token);
	//     const verify = jwt.verify(token, 'secretkey');
	//     //below code use when we have to implement any apecific user to access api
	//     // if (verify.usertype == admin){
	//     //     next();
	//     // }else{
	//     //     return res.status(401).json({
	//     //         msg:"not admin"
	//     //     })
	//     // }
	//     next();
	// } catch (error){
	//    return res.status(401).json({
	//        msg:'invalid token'
	//    })
	//     }

	authValidation(req: any, res: any, next: any) {
		console.log('======BODY========');
		let token = req.headers.authorization.split(' ')[1];
		console.log('======token========', token);
		console.log('======config.JWTSecretKey========', `${process.env.SECRET_KEY}`);
		jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any, decoded: any) => {
			console.log('decodeddddd ::: ', decoded);
			if (err) {
				return res.status(401).json({
					msg: 'invalid token'
				});
			}
		});
		next();
	}

	// authValidation(req, res, next) {
	//   console.log('======BODY========')
	//   // let error = HV.validateHeaders(req.headers)
	//   // if (error) {
	//   //   responseHelper.error(res, error, req.headers.language)
	//   // }
	//   //  else {
	//     // let token = req.headers.auth_token;
	//     let token = req.headers.authorization.split(" ")[1];
	//     console.log('======token========', token)
	//     console.log('======config.JWTSecretKey========', "secretkey")
	//     jwt.verify(token,"secretkey", (err, decoded) => {
	//       console.log("decodeddddd ::: ", decoded);

	//       // if (err) {
	//       //   console.log("error==============", err);
	//       //   if (req.route.path === "/refreshToken") {
	//       //     console.log("refreshtoken next call");
	//       //     next()
	//       //   }
	//       //   else {
	//       //     responseHelper.error(res, 'TOKEN_EXPIRED', req.headers.language)
	//       //   }
	//       // }
	//       //  else if (decoded && decoded.id && (decoded.user_type + 1)) {
	//       //   req.id = decoded.id
	//       //   req.body.id = decoded.id
	//       //   // req.user_type = decoded.user_type
	//       //   if (decoded.is_admin) {
	//       //     delete req.body.user_id
	//       //     req.is_admin = decoded.is_admin;
	//       //     next()
	//       //   }
	//       //   // else {
	//       //   //   HV.isUserActive(req, res, next, decoded)
	//       //   // }
	//       // } else {
	//       //   responseHelper.success(res, 'TOKEN_MALFORMED', req.headers.language)
	//       // }
	//     })
	//     next()
	//   // }
	// }

	isAdmin(req: any, res: any, next: any) {
		if ((req.type = 'admin')) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}
	isUser(req: any, res: any, next: any) {
		if ((req.type = 'user')) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isExecutive(req: any, res: any, next: any) {
		if (req.user_type === 1 || req.user_type === 4) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isSupervisor(req: any, res: any, next: any) {
		if (req.user_type === 2) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isTopSupervisor(req: any, res: any, next: any) {
		if (req.user_type === 3) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isSupervisorOrTopSupervisor(req: any, res: any, next: any) {
		if (req.user_type === 2 || req.user_type === 3) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isExecutiveOrSupervisor(req: any, res: any, next: any) {
		if (req.user_type === 1 || req.user_type === 4 || req.user_type === 2) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	isExecutiveOrSupervisorOrTopSupervisor(req: any, res: any, next: any) {
		if (req.user_type === 1 || req.user_type === 4 || req.user_type === 2 || req.user_type === 3) {
			next();
		} else {
			responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language, '');
		}
	}

	// async isUserActive(req, res, next, decoded) {
	// 	let selectParams = 'is_active',
	// 		where = `customer_id='${decoded.user_id}'`,
	// 		user = '';
	// 	if (decoded.user_type == 0) {
	// 		user = await db.select('customer', selectParams, where);
	// 	} else if (
	// 		decoded.user_type == 1 ||
	// 		decoded.user_type == 2 ||
	// 		decoded.user_type == 3 ||
	// 		decoded.user_type == 4
	// 	) {
	// 		where = `service_provider_id='${decoded.user_id}'`;
	// 		user = await db.select('service_provider', selectParams, where);
	// 	}
	// 	if (user[0] && user[0].is_active) {
	// 		next();
	// 	} else {
	// 		responseHelper.error(res, 'USER_BLOCKED', req.headers.language);
	// 	}
	// }

	// authValidationSocket(req) {
	// 	console.log('======BODY========');
	// 	return new promise((resolve, reject) => {
	// 		let error = HV.validateHeaders(req.headers);
	// 		if (error) {
	// 			reject(error);
	// 		} else {
	// 			let token = req.headers.auth_token;
	// 			console.log('======token========', token);
	// 			jwt.verify(token, config.JWTSecretKey, async (err, decoded) => {
	// 				console.log('decoded ::: ', decoded);
	// 				if (err) {
	// 					// console.log(err);
	// 					reject('TOKEN_EXPIRED');
	// 				} else if (decoded && decoded.user_id && decoded.user_type + 1) {
	// 					req.user_id = decoded.user_id;
	// 					req.user_type = decoded.user_type;
	// 					if (decoded.is_admin) {
	// 						req.is_admin = decoded.is_admin;
	// 					}
	// 					const res_final = await HV.isUserActiveSocket(req, decoded);
	// 					resolve(res_final);
	// 				} else {
	// 					reject('TOKEN_MALFORMED');
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	async isUserActiveSocket(req: any, decoded: any) {
		let selectParams = 'is_active ',
			where = ` service_provider_id='${decoded.user_id}' `,
			user: any = await db.select('service_provider', selectParams, where);
		if (user[0] && user[0].is_active) {
			return req;
		} else {
			return promise.reject('USER_BLOCKED');
		}
	}
}

const HV = new HeaderValidator();
export default HV;
