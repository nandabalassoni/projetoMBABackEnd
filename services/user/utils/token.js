const jwt = require('jsonwebtoken')
const config = require('../config/settings')

const generateToken = (id, user, email) => jwt.sign(
  { iduser: id, username: user, email },
  config.jwt_secret,
  { expiresIn: config.jwt_expire },
)

module.exports = generateToken
