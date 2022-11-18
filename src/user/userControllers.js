const User = require("./userModel");

exports.createUser = async (request, response) => {
  console.log(request);
  try {
    const newUser = await User.create(request.body);
    response.status(201).send({ user: newUser });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.listUsers = async (request, response) => {
  console.log(request);
  try {
    const users = await User.find({});
    response.status(200).send({ users });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.updateUser = async (request, response) => {
  console.log(request);
  try {
  //  get user by username and update password
  console.log('trying to update user');
  const user  = await User.findOneAndUpdate({ users: request.body.username }, { password: request.body.password }, );
  console.log('user updated');
  response.status(200).send({ user });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}

exports.deleteUser = async (request, response) => {
  console.log(request);
  try {
    const user = await User.findOneAndDelete({ users: request.body.username }, { password: request.body.password });
    response.status(200).send({ user });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}