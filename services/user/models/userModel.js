const bcrypt = require('bcrypt')
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

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, 10, (error, hashpass) => {
    user.password = hashpass
    return next()
  })
})

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
