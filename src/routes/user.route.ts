import { Router } from 'express';
import userController from '../api/v1/controllers/userControllers';
import headerValidater from '../api/utils/headersValidator';
// import upload from '../../src/api/utils/uploads';
import { validator } from '../api/v1/middleware/validator.middleware';
import { createUser } from '../../src/api/v1/validators/userValidator';

const user = Router();
// ***********************************************************All Users API*************************************************************
//get all user API
user.get(`/get`, userController.getUsers);
//sign in API
user.post('/signin', headerValidater.checkAuthUser, userController.signIn);
//sign nup API
user.post('/signup', headerValidater.checkDuplicate, [ validator(createUser) ], userController.signUp);
//signout API
user.post('/signout', userController.signOut);
//verify link
user.post('/verify/:id', headerValidater.checkEmail, userController.getVerifyUser);
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

export default user;
