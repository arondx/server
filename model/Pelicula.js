const mongoose = require('mongoose');

const aggregatedReseñasSchema = new mongoose.Schema({
    countReseñas: { type: Number, required: true },
    avgReseñas: { type: Number, required: true },
    totalPorPuntuacion: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 },
    }
});

const peliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    imagen: {
        cloudinaryUrl: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    director: { type: String, required: true},
    genero: { type: String, required: true },
    año: { type: Number, required: true },
    sinopsis: { type: String, required: true },
    destacada: { type: Boolean, required: true, default: false },
    reseñas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reseña' }],
    aggregated: aggregatedReseñasSchema,
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);
module.exports = { Pelicula }