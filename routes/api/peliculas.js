const express = require('express')
const router = express.Router()
const { createPelicula, getAllPeliculas, getPeliculasGenres, getPeliculasAños, getPeliculasDirectores, filterPeliculas } = require('../../controllers/api/peliculas.controller')


router.post('/create', createPelicula)
router.get('/getall', getAllPeliculas)
router.get('/getgenres', getPeliculasGenres)
router.get('/getanos', getPeliculasAños)
router.get('/getdirectores', getPeliculasDirectores)
router.get('/filter', filterPeliculas)



module.exports = router