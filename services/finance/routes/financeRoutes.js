const express = require('express')
const authentication = require('../auth/auth')

const router = express.Router()
const financeController = require('../controllers/financeController')

router.post('/cadastrar', authentication, financeController.registerFinancialInformation)

router.put('/atualizar/:id', authentication, financeController.updateFinancialInformation)

module.exports = router
