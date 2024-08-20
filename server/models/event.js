
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  image: {
    type: Buffer, 
  },
  imageName: {
    type: String,
  },
  info: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event_Morena', eventSchema);

module.exports = Event;