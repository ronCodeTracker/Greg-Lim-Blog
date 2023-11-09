

const express = require('express')

const path = require('path')

const mongoose = require('mongoose')


const app = new express()

const ejs = require('ejs')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/my_database2', { useNewUrlParser: true })

app.use(express.static('public'))







app.listen(4000, () => {
    console.log('Listening on port 4000')
})



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

