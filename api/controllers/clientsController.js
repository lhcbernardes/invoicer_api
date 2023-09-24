const User = require('../models/user');

const getAll = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.clients);
    } catch (error) {
        res.json(clients)
    }
}

const create = async (req, res) => {
    const { id } = req.params;
    const { nome, email, birthday, cpf, address, number, CEP, phone } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'Usuário não cadastrado.' })
    }

    if (user.clients.some(cliente => cliente.cpf === cpf)) {
        return res.status(409).json({ error: 'Cliente já cadastrado' });
    }

    try {
        user.clients.push({ nome, email, birthday, cpf, address, number, CEP, phone });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

const getOne = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        if (client == null) {
            return res.status(404).json({ message: 'Cliente não encontrado' })
        }
        res.json(client)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, birthday, cpf } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        const userAtualizado = await user.save()
        res.json(userAtualizado)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        await user.remove()
        res.json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    updateOne,
    deleteOne
}