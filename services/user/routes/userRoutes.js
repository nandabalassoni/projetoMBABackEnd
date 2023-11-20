const express = require('express')
const authentication = require('../auth/auth')

const router = express.Router()
const userController = require('../controllers/userController')

router.post('/cadastrar', userController.registerUser)

router.post('/login', userController.loginUser)

router.put('/alterarsenha/:id', authentication, userController.alterarSenha)

// Atualiza os dados do usuário
router.put('/atualizarusuario/:id', userController.updateUser)

router.delete('/deletar/:id', userController.deleteUser)

router.use((req, res) => {
  res.type('application/json')
  res.status(404).send({ mensagem: '404 - Not Found' })
})

module.exports = router
