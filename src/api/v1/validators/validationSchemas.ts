import * as Joi from 'joi';
import JoiDate from '@joi/date';
// import JoiTimezone from 'joi-tz';
// import { dateInfo, gender, messageKeys, intensity, orderByKeys } from '../utils/enums';

const JoiDateValidation = Joi.extend(JoiDate);
// const JoiTzValidation = Joi.extend(JoiTimezone);

const checkInteger = (value: any) => {
	if (!Number.isInteger(value)) throw new Error('value must be integer');
	if (value < 0) throw new Error('value must be positive');
	return value;
};

const checkDecimal = (value: any) => {
	const decimal = new RegExp(/^(\d{1,3})(\.\d{1,2})?$/);
	const status = decimal.test(value) ? 'valid' : 'invalid';
	if (status === 'invalid') throw new Error('Invalid decimal pattern');
	if (!Number(value) || typeof value === 'string') throw new Error('value must be number or decimal');
	if (value < 0) throw new Error('value must be positive');
	return value;
};

const newDecimalMethod = (value: any) => {
	const IsDecimal = new RegExp(/^(\d{1,5})(\.\d{1,2})?$/);
	const status = IsDecimal.test(value) ? 'valid' : 'invalid';
	if (status === 'invalid') throw new Error(`Invalid decimal pattern, pattern like ${IsDecimal}`);
	if (!Number(value) || typeof value === 'string') throw new Error('value must be number or decimal');
	if (value < 0) throw new Error('value must be positive');
	return value;
};

const isDecimal = new RegExp(/^\d{1,5}([,.]\d{1,3})?$/);
const stringDecimalValidation = Joi.string().trim().regex(isDecimal).optional().allow('');

const isKlarnaDecimal = new RegExp(/^\d{1,8}([,.]\d{1,2})?$/);
const klarnaDecimalValidation = Joi.string().trim().regex(isKlarnaDecimal).optional().allow('');

const imageUrlRequired = Joi.string()
	.trim()
	.max(500)
	.regex(/:\/\/[0-9a-z-.]+\.[a-z]+\//i)
	.uri({ scheme: [ /https/, /http/ ] })
	.required();
const imageUriValidation = Joi.string()
	.trim()
	.max(500)
	.regex(/:\/\/[0-9a-z-.]+\.[a-z]+\//i)
	.uri({ scheme: [ /https/, /http/ ] })
	.optional()
	.allow('', null);
// const sortByValidation = Joi.string().trim().max(50).valid(orderByKeys.DESC, orderByKeys.ASC).insensitive().optional();
const stringRequired = Joi.string().trim().max(50).required();
const stringOptional = Joi.string().trim().max(50).optional().allow(null, '');
const firstnameRequired = Joi.string().trim().max(100).required();
const lastnameRequired = Joi.string().trim().max(100).required();
const TypeRequired = Joi.string().trim().max(100).required();
const titleOptional = Joi.string().trim().max(100).optional().allow(null, '');
const subTitleRequired = Joi.string().trim().max(200).required();
const subTitleOptional = Joi.string().trim().max(200).optional().allow(null, '');
const photoOptional = Joi.string().trim().max(200).allow(null, '').optional();
const descriptionRequired = Joi.string().trim().max(500).required();
const descriptionOptional = Joi.string().trim().max(500).optional().allow(null, '');
const textOptional = Joi.string().trim().optional().allow(null, '');

const integerRequired = Joi.any().custom(checkInteger).required();
const integerOptional = Joi.any().custom(checkInteger).allow(0);
const decimalOptional = Joi.any().custom(checkDecimal).allow(0, 0.0, 0.0);
const optionalNewDecimal = Joi.any().custom(newDecimalMethod).allow(0, 0.0, 0.0);
const booleanRequired = Joi.boolean().required();
const booleanOptional = Joi.boolean().optional();
const phoneRequired = Joi.string().trim().min(3).max(20).required();
const phoneOptional = Joi.string().trim().min(3).max(20).optional().allow(null, '');

const idValidation = Joi.number().integer().min(1).required().positive();
const idOptional = Joi.number().integer().min(1).optional().allow(0).positive();

const uuidRequired = Joi.string().guid({ version: 'uuidv4' }).required();
const uuidOptional = Joi.string().guid({ version: 'uuidv4' }).optional();

const emailRequired = Joi.string()
	.trim()
	.max(50)
	.regex(
		/^[a-zA-Z0-9._-]{1,100}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,3}$/
	)
	.required();
const emailOptional = Joi.string()
	.trim()
	.max(50)
	.regex(
		/^[a-zA-Z0-9._-]{1,100}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,3}$/
	)
	.optional()
	.allow(null);
const allowPasswordValidation = Joi.string()
	.trim()
	.min(8)
	.max(20)
	// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
	// eslint-disable-next-line max-len
	.message('Invalid password, min 8 & max 20 characters')
	.required();
// const dobValidation = JoiDateValidation.date()
// 	.format([ dateInfo.format_0, dateInfo.format_1 ])
// 	.max(new Date())
// 	.message(messageKeys.futureDateNotAllowed)
// 	.allow(null)
// 	.optional();

/** const phoneRequired = Joi.string().trim().regex(/^\+(?:[\d]){3,15}[\d]$/).required(); */

// const weekDateValidation = JoiDateValidation.date()
// 	.format([ dateInfo.format_0, dateInfo.format_1 ])
// 	.optional()
// 	.allow(null);
const optionalExtraArrayValidation = Joi.array().items(descriptionOptional).unique().optional();

// const checkGender = (value) => {
// 	if (!Number.isInteger(value)) throw new Error('value must be integer');
// 	if (![ gender.male, gender.female, gender.other ].includes(value)) throw new Error('invalid gender provided');
// 	return value;
// };

const getUserValidation = {
	isActive: booleanOptional,
	createdBy: integerOptional,
	updatedBy: integerOptional
};

// const genderValidation = Joi.any().custom(checkGender);
// const tzOptional = JoiTzValidation.timezone().optional().allow(null, '');

// New exercise changes
const timeCheckValidation = Joi.string().trim().regex(/^(\d{1,2}):(\d{1,2})?$/).optional();
const repsIsDecimal = new RegExp(/^(\d{1,3})(-\d{1,3})?$/);
const repsDecimalValidation = Joi.string().trim().regex(repsIsDecimal).optional().allow('');

const repsCheck = repsDecimalValidation;
const timeCheck = timeCheckValidation;
const timerCheck = timeCheckValidation;

const repsValidation = repsCheck.when('weights', {
	is: Joi.exist(),
	then: Joi.when('time', { is: Joi.exist(), then: Joi.forbidden(), otherwise: repsDecimalValidation }),
	otherwise: Joi.forbidden()
});

const timeValidation = timeCheck.when('weights', {
	is: Joi.exist(),
	then: Joi.when('reps', { is: Joi.exist(), then: Joi.forbidden(), otherwise: timeCheckValidation.required() }),
	otherwise: timeCheckValidation
});

const timerValidation = timerCheck.when('weights', {
	is: Joi.exist(),
	then: timeCheckValidation,
	otherwise: Joi.forbidden()
});

const stringValidation = Joi.string().trim();
const speedCheck = stringDecimalValidation;
const inclineCheck = stringDecimalValidation;
const intensityCheck = stringValidation
	// .valid(intensity.low, intensity.high, intensity.medium, intensity.extreme)
	.allow('');

const speedValidation = speedCheck.when('time', {
	is: Joi.exist(),
	then: Joi.when('incline', { is: Joi.exist(), then: stringDecimalValidation, otherwise: stringDecimalValidation }),
	otherwise: Joi.forbidden()
});

const inclineValidation = inclineCheck.when('time', {
	is: Joi.exist(),
	then: Joi.when('speed', { is: Joi.exist(), then: stringDecimalValidation, otherwise: stringDecimalValidation }),
	otherwise: Joi.forbidden()
});

const intensityValidation = intensityCheck.when('time', {
	is: Joi.exist(),
	then: intensityCheck,
	otherwise: Joi.forbidden()
});

const commonExerciseKeys = {
	reps: repsValidation,
	sets: integerOptional,
	time: timeValidation,
	weights: stringDecimalValidation,
	timer: timerValidation,
	incline: inclineValidation,
	speed: speedValidation,
	intensity: intensityValidation
};

// const getFilters = {
// 	limit: integerOptional,
// 	offset: integerOptional,
// 	sortBy: stringOptional,
// 	sortByType: sortByValidation
// };

export {
	JoiDateValidation,
	descriptionRequired,
	descriptionOptional,
	textOptional,
	stringRequired,
	stringOptional,
	integerRequired,
	integerOptional,
	booleanOptional,
	emailRequired,
	allowPasswordValidation,
	emailOptional,
	// dobValidation,
	phoneRequired,
	photoOptional,
	// weekDateValidation,
	phoneOptional,
	// genderValidation,
	optionalExtraArrayValidation,
	idValidation,
	idOptional,
	decimalOptional,
	optionalNewDecimal,
	firstnameRequired,
	lastnameRequired,
	TypeRequired,
	titleOptional,
	subTitleOptional,
	getUserValidation,
	// tzOptional,
	commonExerciseKeys,
	// sortByValidation,
	// getFilters,
	imageUriValidation,
	stringDecimalValidation,
	subTitleRequired,
	imageUrlRequired,
	booleanRequired,
	klarnaDecimalValidation,
	isDecimal,
	uuidOptional,
	uuidRequired
};
