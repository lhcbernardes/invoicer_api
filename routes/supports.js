const express = require('express');
const router = express.Router();
const User = require('../user');

// Rota de serviços
router.get('/:userId', async (req, res) => {
    try {
        const username = req.params;

        const user = await User.findOne({ username: username.userId });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.supports);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar serviços.' });
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const username = req.params;
        const { name, description } = req.body;
        const user = await User.findOne({ username: username.userId });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        user.supports.push({ name, description });
        await user.save();

        res.status(201).json({ message: 'Produto adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Rota para atualizar um produto de um usuário
router.put('/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params;
        const supportId = req.params;
        const name = req.body;
        const description = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const support = user.supports.id(supportId);

        if (!support) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        support.name = name;
        support.description = description;

        await user.save();

        res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o produto.' });
    }
});

// Rota para excluir um produto de um usuário
router.delete('/:userId/:supportId', async (req, res) => {
    try {

        const userId = req.params.userId;
        const supportId = req.params.supportId;
        const user = await User.findOne({ username: userId });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const support = user.supports.id(supportId);

        if (!support) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        support.deleteOne(support);
        await user.save();

        res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o produto.' });
    }
});

// router.get('/', /* ... */);
// router.get('/:id', /* ... */);
// router.put('/:id', /* ... */);
// router.delete('/:id', /* ... */);

module.exports = router;