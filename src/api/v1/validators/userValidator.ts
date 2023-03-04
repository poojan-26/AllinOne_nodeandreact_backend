import Joi from 'joi';
import {
	booleanOptional,
	integerRequired,
	integerOptional,
	titleOptional,
	stringOptional,
	firstnameRequired,
	lastnameRequired,
	emailRequired,
	allowPasswordValidation,
	TypeRequired,
	idValidation,
	descriptionOptional,
	subTitleOptional,
	// getFilters,
	imageUrlRequired,
	stringDecimalValidation,
	decimalOptional,
	imageUriValidation
} from './validationSchemas';

export const createUser = Joi.object().keys({
	firstname: firstnameRequired,
	lastname: lastnameRequired,
	email: emailRequired,
	password: allowPasswordValidation
});
