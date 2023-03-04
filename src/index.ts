import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from './api/utils/db';
import cors from 'cors';
import config from './api/utils/config';
// import myairRoutes from './route/myairRoutes';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';
const swaggerDocument = require('../swagger.json');

//create express app
const app = express();

//setup server port
// const PORT = process.env.PORT || 5000;
app.use(cors());

//parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse request of content-type - application/json
app.use(bodyParser.json({ limit: '10mb' }));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
console.log(`swagger doc-API ::: http://localhost:7000/api-docs`);

//create routes
app.use('/myair/v1', routes);

//parse request data content type application / x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended:false}));

//add single line access the file publicly
app.use('/uploads', express.static('uploads'))

//establish connection with Database
db.getConnection();
try {
	app.listen(config().port, () => {
		console.log(`Server Started at http://${config().host}:${config().port}`);
	});
	// swaggerDocs(app, config().port);
} catch (error) {
	console.log(error);
}

module.exports = app;
