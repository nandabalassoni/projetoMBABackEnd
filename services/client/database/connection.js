const mongoose = require('mongoose')
const settings = require('../config/settings')

const urldb = settings.dbpath

// Conectar ao MongoDB
mongoose.connect(urldb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão realizada com sucesso!')
  }).catch((error) => {
    console.error(`Erro de conexao ->${error}`)
  })

module.exports = mongoose
