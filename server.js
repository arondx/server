require('dotenv').config()
const corsOptions = require('./config/corsOption')

const mongoose = require('mongoose')
const connectDB =   require('./config/dbConn')

const express = require('express')
const  app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser');

const { verifyJWT } = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

connectDB()

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/register', require('./routes/auth/register'))
app.use('/auth', require('./routes/auth/auth'))
app.use('/refresh', require('./routes/auth/refresh'))
app.use('/logout', require('./routes/auth/logout'))
app.use('/image', require('./routes/api/image'))

app.use('/public', (req, res) => {
    res.json({ "message": "Hello from public route" })
})

app.use(verifyJWT)

app.use('/protected', (req, res) => {
    res.json({ "message": "Hello from protected route" })
})

app.use('/generos', require('./routes/api/generos'))
app.use('/peliculas', require('./routes/api/peliculas'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    
    app.listen(process.env.PORT || 3500, () => {
        console.log(`App running at port ${process.env.PORT}`)
    })
})

