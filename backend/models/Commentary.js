const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
  matchId: Number,
  over: Number,
  ball: Number,
  eventType: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commentary', commentarySchema);
