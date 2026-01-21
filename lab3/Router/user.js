const userController = require('../Controller/user');
const express = require('express');
const schemas = require('../schemas');
const validate = require('../middlewares/validation');


const router = express.Router();

router.post('/', validate(schemas.createUserSche), userController.createUser);
router.get('/', validate(schemas.getAllUsersSche), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', validate(schemas.updateUserSche), userController.updateUserById);
router.delete('/:id', userController.deleteUserById);   

module.exports = router;