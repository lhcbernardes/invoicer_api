const User = require('../models/user');

const getAll = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.services);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar serviços.' });
    }
}

const create = async (req, res) => {
    try {
        const { id } = req.params;
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

        const user = await User.findById(id);

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
}

const getOne = async (req, res) => {
    try {
        const estudio = await Estudio.findById(req.params.id)
        if (estudio == null) {
            return res.status(404).json({ message: 'Serviço nao encontrado' })
        }
        res.json(estudio)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const updateOne = async (req, res) => {
    try {
        const estudio = await Estudio.findById(req.params.id)
        if (estudio == null) {
            return res.status(404).json({ message: 'Serviço nao encontrada' })
        }

        if (req.body.nome != null) {
            estudio.title = req.body.nome
        }

        if (req.body.criadoEm != null) {
            estudio.criadoEm = req.body.criadoEm
        }

        const estudioAtualizado = await estudio.save()
        res.json(estudioAtualizado)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        const estudio = await Estudio.findById(req.params.id)
        if (estudio == null) {
            return res.status(404).json({ message: 'Serviço nao encontrada' })
        }

        await estudio.remove()
        res.json({ message: 'Serviço deletado com sucesso!' })
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