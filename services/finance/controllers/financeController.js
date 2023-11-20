const Finance = require('../models/financeModel')
const Client = require('../../client/models/clientModel')

exports.registerFinancialInformation = async (req, res) => {
  try {
    const {
      clientId, bankName, accountType, cardholderName, cardLimit
    } = req.body

    // Verifica se o cliente existe
    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(404).json({ output: 'Cliente não encontrado.' })
    }

    const newFinancialInformation = new Finance({
      client: clientId,
      bankName,
      accountType,
      cardholderName,
      cardLimit,
    })

    await newFinancialInformation.save()

    client.financialInfo = newFinancialInformation.id

    await client.save().then((result) => {
      res.status(201).json({ output: 'Informações financeiras cadastradas com sucesso.', payload: result })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ output: 'Erro no servidor' })
  }
}

exports.updateFinancialInformation = async (req, res) => {
  try {
    const financeId = req.params.id
    const {
      clientId, bankName, accountType, cardholderName, cardLimit
    } = req.body

    // Verifica se o cliente existe
    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(404).json({ output: 'Cliente não encontrado.' })
    }

    const financialInformation = await Finance.findOne({ _id: financeId, client: clientId })

    if (!financialInformation) {
      return res.status(404).json({ output: 'Informações financeiras não encontradas.' })
    }

    financialInformation.bankName = bankName
    financialInformation.accountType = accountType
    financialInformation.cardholderName = cardholderName
    financialInformation.cardLimit = cardLimit

    await financialInformation.save()

    res.status(200).json({ output: 'Informações financeiras atualizadas com sucesso.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ output: 'Erro no servidor' })
  }
}
