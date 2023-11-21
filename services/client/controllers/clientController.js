const Client = require('../models/clientModel')

exports.registerCustomer = async (req, res) => {
  try {
    const {
      name, email, cpf, telephone, address, age
    } = req.body

    // Verifica se o cliente já está cadastrado
    const existingClient = await Client.findOne({ email })
    if (existingClient) {
      return res.status(409).json({ output: 'E-mail já cadastrado.' })
    }

    const newCustomer = new Client({
      name,
      email,
      cpf,
      telephone,
      address,
      age
    })

    await newCustomer.save().then((result) => {
      res.status(200).send({ output: 'Cliente cadastrado com sucesso!', payload: result })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ output: `Erro ao cadastrar cliente: ${error}`, error })
  }
}

exports.listClients = async (req, res) => {
  try {
    const clientes = await Client.find()

    if (clientes.length === 0) {
      return res.status(404).json({ output: 'Nenhum cliente encontrado.' })
    }

    res.status(200).json({ output: 'Lista de clientes encontrada com sucesso.', payload: clientes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ output: `Erro ao listar clientes: ${error}`, error })
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    const clientId = req.params.id
    const {
      name, email, cpf, telephone, address, age
    } = req.body

    const client = await Client.findByIdAndUpdate(clientId)

    if (!client) {
      return res.status(404).json({ output: 'Cliente não encontrado.' })
    }

    client.name = name
    client.email = email
    client.cpf = cpf
    client.telephone = telephone
    client.address = address
    client.age = age

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

    const deletedClient = await Client.findByIdAndDelete(clientId)

    if (!deletedClient) {
      return res.status(404).send({ output: 'Cliente não encontrado' })
    }

    res.status(200).send({ output: 'Cliente apagado com sucesso!' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ output: 'Erro ao apagar cliente:', erro: error })
  }
}
