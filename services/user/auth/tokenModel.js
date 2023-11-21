const mongoose = require('../database/connection')

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userid: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true
  },
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
