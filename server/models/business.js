const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
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

const Business = mongoose.model('business', businessSchema);
module.exports = Business;