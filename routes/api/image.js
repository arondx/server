const express = require('express')
const router = express.Router()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadImage, deleteImage } = require('../../controllers/api/image.controller')

router.post("/upload", upload.single('upload'), uploadImage)
router.post("/delete", deleteImage)

module.exports = router