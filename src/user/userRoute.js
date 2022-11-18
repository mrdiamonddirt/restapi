const {Router} = require('express');
const { createUser, listUsers } = require('./userController.js');
const userRouter = Router();

userRouter.get('/listUsers', listUsers);
userRouter.post('/addUser', createUser);

module.exports = userRouter;
