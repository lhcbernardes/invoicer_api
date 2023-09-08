const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const User = require('./user');

// Criando o servidor express
const app = express();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const serviceRouter = require('./routes/services');
const supportRouter = require('./routes/supports');

// Conectar-se ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/invoice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnect', () => console.log('Desconectado!'));
db.once('open', function () {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/services', serviceRouter);
app.use('/supports', supportRouter);


app.listen(9000, () => {
  console.log('Servidor rodando na porta 9000');
});
