const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String, 
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

