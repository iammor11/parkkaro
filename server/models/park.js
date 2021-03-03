const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true 
  },
  endTime: {
    type: String,
    required: true 
  },
  place: {
    type: String,
    required: true 
  },
  vehicle: {
    type: String,
    required: true 
  },
  time: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},
{timestamps: true});

const Park = mongoose.model('park', parkSchema);
module.exports = Park;