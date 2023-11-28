const { Genero } = require('../../model/Genero')
const Joi = require('joi');

const schema = Joi.object({
    titulo: Joi.string().required()
})

const createGenero = async (req, res) => {
    const validation = schema.validate(req.body)
    if(validation.error) return res.status(400).json({"result": validation.error})
    
    const { titulo } = req.body
    
    const duplicate = await Genero.findOne({ titulo:  titulo})
    if(duplicate) return res.status(409).json({ 'message': `${titulo} already exists.` })

    try {
        const newGenero = Genero.create({
            "titulo": titulo
        })

        res.status(201).json({'success': `New genero ${titulo} created`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllGeneros = async(req, res) => {
    try {
        const allGeneros = await Genero.find({})
        res.status(201).json({allGeneros})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { createGenero, getAllGeneros }