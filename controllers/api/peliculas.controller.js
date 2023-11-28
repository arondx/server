const { Pelicula } = require('../../model/Pelicula')
const Joi = require('joi');

const schema = Joi.object({
    titulo: Joi.string().required(),
    director: Joi.string().required(),
    imagen: Joi.object({
        cloudinaryUrl: Joi.string().required(),
        publicId: Joi.string().required(),
    }).required(),
    año: Joi.number().required(),
    genero: Joi.string().required(),
    sinopsis: Joi.string().required(),
});

const createPelicula = async (req, res) => {
    const validation = schema.validate(req.body)
    if(validation.error) return res.status(400).json({"result": validation.error})

    const { titulo } = req.body
    
    const duplicate = await Pelicula.findOne({ titulo:  titulo})
    if(duplicate) return res.status(409).json({ 'message': `${titulo} already exists.` })

    try {
        const newPelicula = Pelicula.create(req.body)

        res.status(201).json({'success': `New película ${titulo} created`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllPeliculas = async (req, res) => {
    try {
        const result = await Pelicula.find({})
        res.status(201).json({ result })
    } catch(err) {
        res.status(500).json({ 'message': err.message });
    }
}


const getPeliculasGenres = async (req, res) => {
    try {
        const result = await Pelicula.distinct('genero');
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPeliculasAños = async (req, res) => {
    try {
        const result = await Pelicula.distinct('año');
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPeliculasDirectores = async (req, res) => {
    try {
        const result = await Pelicula.distinct('director');
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const filterPeliculas = async (req, res) => {
    try {
        const filters = req.query;
        console.log(filters)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { createPelicula, getAllPeliculas, getPeliculasGenres, getPeliculasAños,  getPeliculasDirectores, filterPeliculas}