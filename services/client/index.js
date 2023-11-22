const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const clientRoutes = require('./routes/clientRoutes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// Rota inicial
app.get('/', (req, res) => {
  res.send({ output: req.headers })
})

// Rotas
app.use('/cliente', clientRoutes)

app.listen(process.env.CLIENT_API_PORT, () => {
  console.log(`Serviço de cliente rodando em http://${process.env.HOST_NAME}:${process.env.CLIENT_API_PORT}`)
})
