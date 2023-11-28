const express = require('express')
const router = express.Router()
const { createGenero, getAllGeneros } = require('../../controllers/api/generos.controller')


router.post('/create', createGenero)
router.get('/getall', getAllGeneros)

module.exports = router
