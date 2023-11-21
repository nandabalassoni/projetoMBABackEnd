const jwt = require('jsonwebtoken')
const config = require('../config/settings')
const Token = require('./tokenModel')

const authentication = async (req, res, next) => {
  const { token } = req.headers

  if (!token) {
    return res.status(401).send({ output: 'Token não informado! Efetue o login.' })
  }

  try {
    // Verifica se o token está presente no banco de dados
    const tokenExists = await Token.findOne({ token })

    if (!tokenExists) {
      return res.status(401).send({ output: 'Token inválido! Efetue o login novamente.' })
    }

    jwt.verify(token, config.jwt_secret, (error, result) => {
      if (error) {
        return res.status(400).send({ output: 'Token inválido!' })
      }

      req.content = {
        id: result.iduser,
        user: result.username,
        email: result.email,
      }

      next()
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ output: `Erro ao autenticar o token: ${error}` })
  }
}

module.exports = authentication
