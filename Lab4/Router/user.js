const userController = require('../Controller/user');
const express = require('express');
const schemas = require('../schemas');
const validate = require('../middlewares/validation');


const router = express.Router();

router.post('/sign-up', validate(schemas.signUpSchema), usersController.signUp);
router.get('/', validate(schemas.getAllUsersSche), userController.getAllUsers);
router.get('/:id', authenticate, restrictTo(['admin']), userController.getUserById);
router.patch('/:id', authenticate, restrictTo(['admin']), validate(schemas.updateUserSchema), userController.updateUserById);
router.delete('/:id', authenticate, restrictTo(['admin']), userController.deleteUserById);
  

module.exports = router;