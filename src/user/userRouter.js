const {Router} = require('express');
const { createUser, listUsers } = require('./userControllers.js');
const userRouter = Router();

// userRouter.get('/listUsers', listUsers);
userRouter.post('/addUser', createUser);
userRouter.get('/listUsers', listUsers);

module.exports = userRouter;
