const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../middlewares/validation');

router.get('/', usersController.getUsers);
router.get('/me', usersController.getCurrentUser);
router.get('/:userId', validationUserId, usersController.getUserById);
router.patch('/me', validationUpdateUser, usersController.updateUser);
router.patch('/me/avatar', validationUpdateAvatar, usersController.updateUserAvatar);

module.exports = router;
