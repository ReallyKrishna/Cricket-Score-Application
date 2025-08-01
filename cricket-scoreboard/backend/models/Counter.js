const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Counter', counterSchema);
