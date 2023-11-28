const { router } = require('json-server');
const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
});

const Genero = mongoose.model('Genero', generoSchema);
module.exports = { Genero }
