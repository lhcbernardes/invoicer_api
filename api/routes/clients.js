const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientsController')
const { body, validationResult, query } = require('express-validator');

//listar todas as clientes
router.get('/:id', query('id').notEmpty(), controller.getAll )

//criar uma nova cliente
router.post('/:id', [
    body('email')
    .notEmpty()
    .withMessage('O campo de e-mail não pode estar vazio ou invalido')
    .isEmail()
    .withMessage('Digite um endereço de e-mail válido'), 
    body('cpf').notEmpty(), 
    body('phone').notEmpty().isMobilePhone()], 
    controller.create)

//listar uma cliente
router.get('/:id/:clientid', query('id').notEmpty(), controller.getOne )

//atualizar uma informacao especifica num cliente
router.patch('/:id/:name', query('id').notEmpty(), controller.updateOne)

//deletar uma cliente
router.delete('/:id/:name', query('id').notEmpty(), controller.deleteOne)

// router.get('/:id', async (req, res) => {
//     try {
//         const {id} = req.params;

//         const user = await User.findById( id );

//         if (!user) {
//             return res.status(404).json({ message: 'Usuário não encontrado.' });
//         }

//         res.status(200).json(user.clients);
//     } catch (error) {
//         res.status(500).json({ message: 'Erro ao listar clientes.' });
//     }
// });

// router.post('/new/:id', async (req, res) => {
//     try {
//         const _id = req.params;
//         const {nome, email, birthday, cpf} = req.body;

//         const usuario = await User.findById({ _id: _id.id });
//         if (!usuario) {
//             return res.status(404).json({ error: 'Usuário não encontrado' });
//         }

//         const newClient = new Client({nome, email, birthday: new Date(birthday), cpf});

//         usuario.clients.push(newClient);
//         await usuario.save();

//         res.status(201).json(usuario);
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ error: 'Erro ao adicionar o cliente ao usuário' });
//     }
// });

// router.delete('/:id/all', async (req, res) => {
//     try {
//         const {id} = req.params;

//         const user = await User.findById( id );

//         if (!user) {
//             return res.status(404).json({ message: 'Usuário não encontrado.' });
//         }
//         console.log(user.clients)

//         user.clients.deleteMany();
//         res.status(200).json('Usuário removido com sucesso!');
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// router.delete('/:id/:clientid', async (req, res) => {
//     try {
//         const {id, clientid} = req.params;

//         const user = await User.findById( id );

//         if (!user) {
//             return res.status(404).json({ message: 'Usuário não encontrado.' });
//         }

//         console.log(user.clients.findById(clientid))
//         const GET_CLIENT = user.clients.findById(clientid);

//         if (!GET_CLIENT) {
//             return res.status(404).json({ message: 'Produto não encontrado.' });
//         }

//         user.deleteOne(GET_CLIENT);
//         res.status(200).json('Usuário removido com sucesso!');
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;