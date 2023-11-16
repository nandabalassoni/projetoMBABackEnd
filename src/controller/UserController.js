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

    async authenticate(req, res) {
        const { email, senha } = req.body;
        // Aqui você deve buscar o usuário no banco de dados
        const user = await User.findOne({ email });
        const match = await bcrypt.compare(senha, user.senha);
        if (match) {
            const token = jwt.sign({ id: user.id }, 'your-secret-key');
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Senha incorreta' });
        }
    }

    async changePassword(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        // Aqui você deve buscar o usuário no banco de dados
        const user = await User.findOne({ email });
        const match = await bcrypt.compare(oldPassword, user.senha);
        if (match) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Aqui você deve atualizar a senha do usuário no banco de dados
            await User.updateOne({ email }, { senha: hashedPassword });
        } else {
            res.status(401).json({ message: 'Senha antiga incorreta' });
        }
    }
}
module.exports = new UserController();