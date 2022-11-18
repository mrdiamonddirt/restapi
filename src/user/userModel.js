const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/
    },
});

const User = mongoose.model('User', userSchema);

export default User;