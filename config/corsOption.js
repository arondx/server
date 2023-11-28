const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
            if (!origin || allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions