const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.static('public'))
app.use(express.static('public/css'))
app.use(express.static('public/image'))
app.use(express.static('public/js'))
app.use(express.static('views'))
app.get('/', (req, res) => {
    res.send('index.html')
})
const postsRouter = require('./routes/posts.router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/posts', postsRouter)

const PORT = process.env.PORT || 3000



app.listen(PORT, () => { console.log(`A server hallgatózik a ${PORT}-on 😉`) })
