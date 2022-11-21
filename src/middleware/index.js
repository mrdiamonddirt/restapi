const bcrypt = require('bcrypt');
const User = require('../user/userModel');
const JWT = require('jsonwebtoken');

exports.hashPassword = async (request, response, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.comparePassword = async (request, response, next) => {
  try {
    request.user = await User.findOne({ username: request.body.username });
    if (request.user && await bcrypt.compare(request.body.password, request.user.password)) {
      console.log("username and password match");
      next();
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

