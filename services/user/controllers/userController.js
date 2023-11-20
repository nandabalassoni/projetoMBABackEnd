const bcrypt = require('bcrypt')

const config = require('../config/settings')
const generateToken = require('../utils/token')

const User = require('../models/userModel')
const ManagerUser = require('../models/managerUserModel')

exports.registerUser = async (req, res) => {
  try {
    const {
      name, email, cpf, telephone, age, username, password
    } = req.body

    // Verifique se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ output: 'E-mail já cadastrado.' })
    }

    // Criptografe a senha antes de armazenar no banco de dados
    const passwordHash = await bcrypt.hash(password, config.bcrypt_salt)

    const newUser = new User({
      name,
      email,
      cpf,
      telephone,
      age,
      username,
      password: passwordHash,
      createddate: new Date(),
    })

    await newUser.save().then((result) => {
      res.status(201).send({ output: 'Usuário cadastrado com sucesso!', payload: result })
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ output: `Erro ao cadastrar usuário: ${error}`, error })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body

    console.log(`${username} - ${password}`)

    // Verifique se o e-mail existe no banco de dados
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ output: 'Usuário não encontrado!' })
    }

    // Verifica a senha
    // const correctPassword = await bcrypt.compare(password, user.password)
    // if (!correctPassword) {
    //   return res.status(401).json({ output: 'Senha incorreta!' })
    // }

    const token = generateToken(user.id, user.username, user.email)

    const info = new ManagerUser({
      userid: user.id,
      username: user.username,
      information: req.headers,
      logindate: new Date(),
    })

    await info.save()

    res.status(200).send({ output: 'Login realizado com sucesso!', payload: user, token })
  } catch (error) {
    console.error(error)
    res.status(500).send({ output: `Erro ao realizar o login: ${error}` })
  }
}

exports.alterarSenha = async (req, res) => {
  try {
    const userId = req.params.id

    const { currentPassword, newPassword } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ output: 'Usuário não encontrado' })
    }

    // const correctPassword = await user.checkPassword(currentPassword)
    // if (!correctPassword) {
    //   return res.status(401).json({ output: 'Senha atual incorreta' })
    // }

    const newEncryptedPassword = await bcrypt.hash(newPassword, config.bcrypt_salt)

    user.password = newEncryptedPassword

    await user.save()

    res.status(200).json({ output: 'Senha alterada com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ output: 'Erro no servidor' })
  }
}

exports.updateUser = (req, res) => {
  try {
    const user = User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!user) {
      res.status(400).send({ output: 'Não foi possível localizar o usuário!' })
    }
    res.status(200).send({ ouptut: 'Usuário atualizado com sucesso!', payload: user })
  } catch (error) {
    console.error(error)
    res.status(500).send({ output: 'Erro ao tentar atualizar', erro: error })
  }
}

exports.deleteUser = (req, res) => {
  try {
    User.findByIdAndDelete(req.params.id)
    res.status(204).send({ output: 'Usuário apagado com sucesso!' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ output: 'Erro ao apagar usuário:', erro: error })
  }
}
