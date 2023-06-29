const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validationUserRegister,
  validationUserAuth,
} = require('../middlewares/validation');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signup', validationUserRegister, usersController.createUser);
router.post('/signin', validationUserAuth, usersController.loginUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
