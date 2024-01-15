
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    laststName: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNumber: { type: Number },
    companyName: { type: String, required: true },
    companyAddress: { type: String },
    companyWebsite: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

