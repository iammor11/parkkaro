const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mblno: {
    type: Number,
    required: true
  },
  userType: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;