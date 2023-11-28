const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    peliculaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelicula', required: true },
    puntuacion: { type: Number, required: true },
    comentario: { type: String, required: true },
});

const Reseña = mongoose.model('Reseña', reseñaSchema);
module.exports = { Reseña   }