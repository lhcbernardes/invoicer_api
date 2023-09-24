const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: String,
    number: String,
    CNPJ: String,
    CEP: String,
    labelTitle: String,
    subtitle: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    supports: [
        {
            name: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    services: [
        {
            name: String,
            CPF: String,
            address: String,
            city: String,
            number: String,
            telephone: String,
            instrument: String,
            brand: String,
            color: String,
            bag: Boolean,
            description: String,
            value: Number,
            finish: Date,
            supports: [],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    clients: [
        {
            address: String,
            number: String,
            CEP: String,
            nome: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            cpf: {
                type: String,
                required: true,
                unique: true
            },
            phone: {
                type: String,
                required: true
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
