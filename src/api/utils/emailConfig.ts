require('dotenv').config();
import nodemailer from 'nodemailer';

// let transporter = nodemailer.createTransport({
// 	host: process.env.EMAIL_HOST,
// 	port: process.env.EMAIL_PORT,
// 	secure: false, //true for 465, false for other port
// 	auth: {
// 		user: 'dhorajiyapoojan@gmail.com', // admin gmail id
// 		pass: 'rdbyktdjjjskyrwn' //admin gmail password
// 	}
// });


// export default transporter;


		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS
			}
		})
export default transporter;