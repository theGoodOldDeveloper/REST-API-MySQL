const express = require('express')
require('dotenv').config()

const app = express()

const postsRouter = require('./routes/posts.router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/posts', postsRouter)

const PORT = process.env.PORT || 3000



app.listen(PORT, () => { console.log(`A server hallgatózik a ${PORT}-on 😉`) })
