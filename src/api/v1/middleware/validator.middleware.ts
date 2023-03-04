import { NextFunction } from 'express';
// import { messageKeys } from '../../../api/utils/enums';
import { HttpStatusCode } from '../../utils/httpStatusCode';

const { BAD_REQUEST } = HttpStatusCode;

export const validator = (schema:any, option = {}, formData = false) => {
    return async (req:any, res:any, next: NextFunction) => {
        let inputs = {};
        if (req?.body && req.params)
            inputs = { ...req.body, ...req.params };
        else if (req?.body)
            inputs = { ...req.body };
        else if (req?.params)
            inputs = { ...req.params };
        try {
            // allowUnknown: true,
            await schema.validateAsync(inputs, { abortEarly: true, ...option });
            // const { userId = null } = req;
            // updated code for updated date in table with milliseconds
            // if ([httpMethods.put, httpMethods.delete].includes(req.method) && req.body) {
            //     // req.body[orderByColumns.updatedAt] = moment().valueOf();
            //     req.body[dbTableColumn.updatedBy] = userId || 0;
            // }
            // if (userId) delete req.userId;
            if (formData) return;
            next();
        } catch (err:any) {
res.status(422).json({
      errorCause: err.name,
      missingParams: err.details[0].path,
      message: err.details[0].message
   
    });
//   err.stackTrace = err.details.map(({
//                 message, context: { key }
//             }: {
//                 message: string, context: { key: string, },
//             }) => ({ key, message: message.replace(/['"]/g, '') }));
//             const error: any = {
//                 statusCode: err?.statusCode || BAD_REQUEST,
//                 message: messageKeys.requestValidationFail,
//                 error: err.stackTrace.length > 0 ? err.stackTrace[0] : {}
//             };
//             if (!next) throw error;
//             next(error);
        }
    };
};
