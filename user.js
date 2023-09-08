const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
            description: String,
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
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
