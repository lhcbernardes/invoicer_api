const User = require('../models/user');

const getAll = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.supports);
    } catch (error) {
        res.json(supports)
    }
}

const getOne = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.supports);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar serviços.' });
    }
}

const create = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;
        console.log(req.params)

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        user.supports.push({ name });
        await user.save();

        res.status(201).json({ message: 'Produto adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const updateOne = async (req, res) => {
    try {
        const userId = req.params;
        const supportId = req.params;
        const name = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const support = user.supports.id(supportId);

        if (!support) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        support.name = name;

        await user.save();

        res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o produto.' });
    }
}

const deleteOne = async (req, res) => {
    try {
        const userId = req.params;
        const supportId = req.params;
        const user = await User.findById(userId);

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
}

module.exports = {
    getAll,
    create,
    getOne,
    updateOne,
    deleteOne
}