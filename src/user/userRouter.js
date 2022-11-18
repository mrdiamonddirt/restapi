const {Router} = require('express');
const { createUser, listUsers, updateUser, deleteUser } = require('./userControllers.js');
const userRouter = Router();

// userRouter.get('/listUsers', listUsers);
userRouter.post('/addUser', createUser);
userRouter.get('/listUsers', listUsers);
userRouter.put('/updateUser', updateUser);
userRouter.delete('/deleteUser', deleteUser);


module.exports = userRouter;
