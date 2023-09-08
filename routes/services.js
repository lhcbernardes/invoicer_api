const express = require('express');
const router = express.Router();
const User = require('../user');

// Rota de serviços
router.post('/:userId', async (req, res) => {
    try {
        const username = req.params;
        const { name,
            CPF,
            address,
            city,
            number,
            telephone,
            instrument,
            brand,
            color,
            bag,
            description,
            value,
            finish,
            supports
        } = req.body;
        const user = await User.findOne({ username: username.userId });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        user.services.push({
            name,
            CPF,
            address,
            city,
            number,
            telephone,
            instrument,
            brand,
            color,
            bag,
            description,
            value,
            finish,
            supports
        });
        await user.save();

        res.status(201).json({ message: 'Serviço adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir serviço.' });
    }
});

// Rota de serviços
router.get('/:userId', async (req, res) => {
    try {
        const username = req.params;

        const user = await User.findOne({ username: username.userId });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.services);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar serviços.' });
    }
});

// router.get('/', /* ... */);
// router.get('/:id', /* ... */);
// router.post('/', /* ... */);
// router.put('/:id', /* ... */);
// router.delete('/:id', /* ... */);

module.exports = router;