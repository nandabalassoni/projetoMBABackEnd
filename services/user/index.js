const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// Rota inicial
app.get('/', (req, res) => {
  res.send({ output: req.headers })
})

// Definir as rotas
const userRoutes = require('./routes/userRoutes')

app.use('/usuario', userRoutes)

// Iniciar o servidor
app.listen(process.env.USER_API_PORT, () => {
  console.log(`Serviço de usuário rodando em http://${process.env.HOST_NAME}:${process.env.USER_API_PORT}`)
})
