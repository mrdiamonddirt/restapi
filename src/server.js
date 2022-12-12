require('./db/connection.js');

const express = require('express');
const userRouter = require('./user/userRouter.js');

const app = express();
const port = process.env.Port || 5001;


app.use(express.json());
app.use(userRouter);


app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
});
