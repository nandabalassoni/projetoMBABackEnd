const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Define a classe UserController com um construtor que inicializa o express
class UserController {
    constructor() {
        this.router = express.Router();
    }

    async register(req, res) {
        const { nomeusuario, email, senha, nomecompleto, telefone, datacadastro } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        // Aqui você salva, cria o usuário no banco de dados
        await User.create({ nomeusuario, email, senha: hashedPassword, nomecompleto, telefone, datacadastro });
        // Enviando uma resposta ao usuário
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
}