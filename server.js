const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')
const router = require('./app/routes/router')
const PORT = process.env.PORT || 3000

server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"],
        "img-src": ["'self'", "https: data"]
    }
}))

server.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

server.use('/', router)

server.set('view engine', 'ejs')


server.listen(PORT, ()=> console.log(`Port: ${PORT} is running...so go and catch it.`))