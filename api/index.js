require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Criando o servidor express
const app = express();
require('dotenv').config()

const userRouter = require('./routes/users');
const clientRouter = require('./routes/clients');
const serviceRouter = require('./routes/services');
const supportRouter = require('./routes/supports');

const db = require('./data/database')
db.connect()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.json("hello world");
});

app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/services', serviceRouter);
app.use('/supports', supportRouter);

app.use('/.netlify/functions/server', router);

app.listen(process.env.PORT || 9000, () => {
  console.log('Servidor rodando na porta 9000');
});
