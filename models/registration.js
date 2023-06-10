const mongoose = require("mongoose");



const user = new mongoose.Schema({
    name: {
        fisrt_name: { type: String, required: true },
        middle_name: { type: String, required: false },
        last_name: { type: String, required: true }
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('user', user);
