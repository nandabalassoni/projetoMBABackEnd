const jwt = require('jsonwebtoken')
const config = require('../config/settings')

const authentication = (req, res, next) => {
  const tokenCreated = req.headers.token

  console.log(tokenCreated)

  if (!tokenCreated) {
    return res.status(401).send({ output: 'Token não informado!' })
  }

  jwt.verify(tokenCreated, config.jwt_secret, (error, result) => {
    if (error) {
      return result.status(400).send({ output: 'Token inválido!' })
    }

    req.content = {
      id: result.iduser,
      user: result.username,
      email: result.email,
    }

    next()
  })
}

module.exports = authentication
