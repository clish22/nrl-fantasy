const mongoose = require('mongoose');

// name, logo, colors, city, stadium

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
