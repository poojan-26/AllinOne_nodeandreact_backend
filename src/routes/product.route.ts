import { Router } from 'express';
import productController from '../api/v1/controllers/productController';
import upload from '../api/utils/uploads';
// import headerValidater from '../api/utils/headersValidator';
// import upload from '../../src/api/utils/uploads';
// import { validator } from '../api/v1/middleware/validator.middleware';
// import { createUser } from '../../src/api/v1/validators/userValidator';

const product = Router();
// ***********************************************************All Users API*************************************************************
//get all products
product.get(`/getProduct`, productController.getProducts);
//get product by id 
product.get(`/:id`, productController.getProduct)
//create products
product.post('/create', upload.single('image'), productController.createProduct);
//delete prouct
product.delete('/delete/:id', productController.deleteProduct);
// //get one user data api by id
// user.get(`/:id`, userController.getUser);
// //create user data api(without file and token)
// user.post(`/new`, headerValidater.checkDuplicate, [ validator(createUser) ], userController.createUser);
// //delete user by id api
// user.delete(`/:id`, headerValidater.authValidation, userController.deleteUser);
// //update user by id api
// user.put(`/:id`, headerValidater.authValidation, userController.updateUser);
// //upload file single and multiple using multer
// user.post(`/newWithfile`, upload.single('file'), userController.createUserWithFile);
// ******************************************************************************************************************************************

export default product;
