const mongoose = require('../database/connection')

const userManagerSchema = new mongoose.Schema({
  userid: { type: String, unique: true },
  username: { type: String },
  information: [{}],
  logindate: { type: Date, default: Date.now },
})

const UserManager = mongoose.model('ManagerUser', userManagerSchema)

module.exports = UserManager
