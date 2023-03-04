import { Router } from 'express';
import user from './user.route';
import product from './product.route';
// import property from './propertyDeviation.routes';

const router = Router();

// router.use('/property/measurement/mean', property);
router.use('/user', user);
router.use('/product', product);
// router.use('/user', user);
// router.use('/channel', channel);
// router.use('/video', video);

export default router;
