const bcrypt = require('bcrypt');
const User = require('../user/userModel');
const JWT = require('jsonwebtoken');
const validator = require('email-validator');

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

exports.tokenCheck = async (request, response, next) => {
  try {
    if (request.header('Authorization')) {
      const token = request.header('Authorization').replace('Bearer ', '');
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        request.user = user;
        console.log("token verified");
        console.log(user)
      } else {
        console.log("token not verified");
        throw new Error('User not found');
      }
    } else {
      throw new Error('No token provided');
    }
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.validateEmail = async (request, response, next) => {
try {
  if (validator.validate(request.body.email)) {
    console.log("email is valid");
    next();
  } else {
    throw new Error('Invalid email');
  }
} catch (error) {
  console.log(error);
  response.status(500).send({ error: error.message });
}
}

//EMAIL VALIDATION WITH REGULAR EXPRESSIONS WITHOUT USING A NPM LIBARY

// exports.validateEmail = async (request, response, next) => {
//     try {
//         const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; 
//         console.log(regex.test(request.body.email)) // returns true or false
//         if (regex.test(request.body.email)) {
//             console.log("vaild email")
//             next()
//         } else {
//             throw new Error ("invaild email please try again")
//         }
 
//     } catch (error) {
//         console.log(error)
//         response.status(500).send({error: error.message})
//     }
// }
