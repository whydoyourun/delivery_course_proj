const Router = require('express');
const router = new Router();

const cartRouter = require('./cartRouter');
const menuRouter = require('./menuRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');

router.use('/cart', cartRouter);
router.use('/menu', menuRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);

module.exports = router;