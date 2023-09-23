require('dotenv').config()
const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(
            console.log('Database connected')
        )
        .catch(err => console.err)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('disconnect', () => console.log('Desconectado!'));
    db.once('open', function () {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    });
}

module.exports = { connect }