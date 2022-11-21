const bcrypt = require('bcrypt');
const User = require('../user/userModel');

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