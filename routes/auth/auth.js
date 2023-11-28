const express = require('express')
const router = express.Router()
const { handleAuth } = require('../../controllers/auth/auth.controller')

router.post('/', handleAuth)

module.exports = router