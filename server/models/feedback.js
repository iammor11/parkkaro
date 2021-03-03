const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true});

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;