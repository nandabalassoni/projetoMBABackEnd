const bcrypt = require('bcrypt')

const config = require('../config/settings')
const generateToken = require('../utils/token')
const Token = require('../auth/tokenModel')

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
    const passwordHash = await bcrypt.hash(password, 10)

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

exports.listUsers = async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados
    const usuarios = await User.find();

    // Verifica se há usuários
    if (usuarios.length === 0) {
      return res.status(404).json({ output: 'Nenhum usuário encontrado.' });
    }

    // Retorna a lista de usuários
    res.status(200).json({ output: 'Lista de usuários encontrada com sucesso.', payload: usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ output: `Erro ao listar usuários: ${error}`, error });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verifique se o e-mail existe no banco de dados
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ output: 'Usuário não encontrado!' })
    }

    // Verifica a senha
    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      return res.status(401).json({ output: 'Senha incorreta!' })
    }

    // Verifica se o usuário já está logado
    const existingToken = await Token.findOne({ userid: user.id })

    if (existingToken) {
      return res.status(401).json({ output: 'Usuário já está logado!', payload: user, existingToken })
    }

    const token = generateToken(user.id, user.username, user.email)

    // Insere o token na tabela de tokens
    const tokenEntry = new Token({ token, userid: user.id })
    await tokenEntry.save()

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

exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers.token;

    // Remove o token do banco de dados
    await Token.findOneAndDelete({ token });

    res.status(200).send({ output: 'Logout realizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ output: `Erro ao realizar o logout: ${error}` });
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

    const correctPassword = await bcrypt.compare(currentPassword, user.password)
    if (!correctPassword) {
      return res.status(401).json({ output: 'Senha atual incorreta!' })
    }

    const newEncryptedPassword = await bcrypt.hash(newPassword, config.bcrypt_salt)

    user.password = newEncryptedPassword

    await user.save()

    res.status(200).json({ output: 'Senha alterada com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ output: 'Erro no servidor' })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, cpf, telephone, age, username } = req.body;

    const updatedFields = { name, email, cpf, telephone, age, username };

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!user) {
      return res.status(400).send({ output: 'Não foi possível localizar o usuário!' });
    }

    const userObject = user.toObject();

    return res.status(200).send({ output: 'Usuário atualizado com sucesso!', payload: userObject });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ output: 'Erro ao tentar atualizar', erro: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const token = req.headers.token;

    // Tenta excluir o usuário e captura o usuário excluído (ou null)
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send({ output: 'Usuário não encontrado' });
    }

    // Remove o token do banco de dados
    await Token.findOneAndDelete({ token });

    res.status(200).send({ output: 'Usuário apagado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ output: 'Erro ao apagar usuário:', erro: error });
  }
};

