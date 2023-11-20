const Client = require('../models/clientModel')

exports.registerCustomer = async (req, res) => {
  try {
    const {
      name, email, cpf, telephone, address, age
    } = req.body

    const newCustomer = new Client({
      name,
      email,
      cpf,
      telephone,
      address,
      age
    })

    await newCustomer.save().then((result) => {
      res.status(201).send({ output: 'Cliente cadastrado com sucesso!', payload: result })
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ output: `Erro ao cadastrar cliente: ${error}`, error })
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    const clientId = req.params.id
    const {
      name, email, telephone, address
    } = req.body

    const client = await Client.findByIdAndUpdate(clientId)

    if (!client) {
      return res.status(404).json({ output: 'Cliente não encontrado.' })
    }

    client.name = name
    client.email = email
    client.telephone = telephone
    client.address = address

    await client.save().then((results) => {
      res.status(200).send({ output: 'Cliente atualizado com sucesso!', payload: results })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ output: `Erro ao atualizar cliente: ${error}`, error })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const clientId = req.params.id

    const client = await Client.findByIdAndDelete(clientId)

    await client.save()
    res.status(204).send({ output: 'Cliente apagado com sucesso!' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ output: 'Erro ao apagar cliente:', erro: error })
  }
}
