const express = require('express')
const authentication = require('../auth/auth')

const router = express.Router()
const clientController = require('../controllers/clientController')

router.post('/cadastrar', authentication, clientController.registerCustomer)

router.put('/atualizar/:id', authentication, clientController.updateCustomer)

router.delete('/deletar/:id', authentication, clientController.deleteCustomer)

router.use((req, res) => {
  res.type('application/json')
  res.status(404).send({ mensagem: '404 - Not Found' })
})

module.exports = router
