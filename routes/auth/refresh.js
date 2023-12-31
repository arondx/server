const express = require('express')
const router = express.Router()
const { handleRefreshToken } = require('../../controllers/auth/refreshToken.controller')

router.get('/', handleRefreshToken)

module.exports = router