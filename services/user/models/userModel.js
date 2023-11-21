const mongoose = require('../database/connection')

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  cpf: { type: String, unique: true, require: true },
  telephone: { type: String },
  age: { type: Number, require: true },
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  createddate: { type: Date, default: Date.now },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
