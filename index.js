

const express = require('express')

const path = require('path')

const mongoose = require('mongoose')


const app = new express()

const ejs = require('ejs')

// new November 18, 2023
const BlogPost = require('./models/BlogPost.js')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/my_database2')

app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({extended:true}))





app.listen(4000, () => {
    console.log('Listening on port 4000')
})



app.get('/', (req, res) => {

    //Display a list of blog posts (interacting with MongoDb)
    BlogPost.find({}).then(result => {
        console.log(result)
        res.render('index', { result })
        // whenever the key name and the value name are the same
        // (e.g. blogposts: blogposts) we can shorten it to simply 'index',{blogposts}
        // or in our case result is out name for blogposts
        //  'index',{blogposts:blogposts}  is how it would be not shortened
        // index.ejs view now has access to the blogposts variable

    })

    //res.render('index')
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


app.get('/posts/new', (req, res)=> {
    res.render('create')
})


app.post('/posts/store', (req, res) => {
    console.log(req.body)
    BlogPost.create(req.body).then(
        res.redirect('/')
    )
    
})


