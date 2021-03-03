const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helpSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mblno: {
    type: Number, 
    required: true
  },
  message: {
    type: String,
    required: true 
  },
  time: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true});

const Help = mongoose.model('help', helpSchema);
module.exports = Help;