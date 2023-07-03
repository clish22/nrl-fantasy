const mongoose = require('mongoose');

// name, dateOfBirth, height, weight, birthPlace, debutClub, biography

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
  },
  debutClub: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
