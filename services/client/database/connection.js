const mongoose = require('mongoose')
const settings = require('../config/settings')

const urldb = settings.dbpath

console.log(urldb)

// Conectar ao MongoDB
mongoose.connect(urldb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((rs) => {
    console.log(rs)
  }).catch((error) => {
    console.error(`Erro de conexao ->${error}`)
  })

module.exports = mongoose
