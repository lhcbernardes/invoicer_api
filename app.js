const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user');
const app = express();

// Conectar-se ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/invoice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota de criação de usuário
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// Rota de serviços
app.get('/support/:userId', async (req, res) => {
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

app.post('/support/:userId', async (req, res) => {
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

// Rota para excluir um produto de um usuário
app.delete('/support/:userId/:supportId', async (req, res) => {
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

// Rota para atualizar um produto de um usuário
app.put('/support/:userId/:productId', async (req, res) => {
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

// Rota de serviços
app.post('/service/:userId', async (req, res) => {
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
app.get('/service/:userId/', async (req, res) => {
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


app.listen(3030, () => {
  console.log('Servidor rodando na porta 3030');
});
