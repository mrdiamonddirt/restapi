const {Router} = require('express');
const { createUser, listUsers, updateUser, deleteUser, loginUser } = require('./userControllers.js');
const { hashPassword, comparePassword, tokenCheck } = require('../middleware');
const userRouter = Router();


// add tokencheck on each endpoint
// userRouter.get('/listUsers', listUsers);
userRouter.post('/addUser',hashPassword, createUser);
userRouter.post('/loginUser',tokenCheck, comparePassword, loginUser)
userRouter.get('/listUsers', listUsers);
userRouter.put('/updateUser', updateUser);
userRouter.delete('/deleteUser', deleteUser);




module.exports = userRouter;
