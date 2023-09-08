const express = require('express');
const router = express.Router();
const User = require('../user');

// Rota de criação de usuário
router.post('/signup', async (req, res) => {
    try {
        const { username } = req.body;

        // Verifique se o usuário já existe
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Nome de usuário já existe.' });
        }

        const newUser = new User({ username });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        // Verifique se o usuário existe
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(existingUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
});

// Rota para logout (se aplicável)
router.post('/logout', (req, res) => {
    // Lógica de logout, como invalidar tokens, etc.
    res.status(200).json({ message: 'Logout bem-sucedido' });
});

// Rota para delete user por id
router.delete('/:userName', async (req, res) => {
    try {
        const username = req.params;

        // Verifique se o usuário existe
        const existingUser = await User.findOne({ username: username.userName });

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const userId = existingUser._id;

        existingUser.deleteOne(userId);
        res.status(200).json('Usuário removido com sucesso!');
    } catch (error) {
        res.status(500).json(error);
    }
});

// router.get('/', /* ... */);
// router.get('/:id', /* ... */);
// router.put('/:id', /* ... */);
// router.delete('/:id', /* ... */);

module.exports = router;