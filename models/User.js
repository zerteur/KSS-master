const mongoose = require("mongoose")

const schema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 2
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("User", schema)