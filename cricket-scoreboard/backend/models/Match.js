const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: { type: Number, unique: true },
  teams: String,
  status: { type: String, default: 'ongoing' }
});

module.exports = mongoose.model('Match', matchSchema);
