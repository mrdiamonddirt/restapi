const {Router} = require('express');
const { createUser, listUsers, updateUser, deleteUser, loginUser } = require('./userControllers.js');
const { hashPassword } = require('../middleware');
const userRouter = Router();

// userRouter.get('/listUsers', listUsers);
userRouter.post('/addUser',hashPassword, createUser);
userRouter.post('/loginUser',hashPassword, loginUser)
userRouter.get('/listUsers', listUsers);
userRouter.put('/updateUser', updateUser);
userRouter.delete('/deleteUser', deleteUser);




module.exports = userRouter;
