

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



app.post('/', (req, res) => {

    //var titleOne = "Lord"
    //BlogPost.createIndexes({ "title": "text" })
    
    BlogPost.find({ $text: { $search: req.body.searchdata } }).then(result => {
        console.log(result)
        res.render('index', { result })
    })

        // using index in models folder BlogPost.js
        // we then search for  string that is in searchdata element
        // then mongodb finds the post that matches
        // then we render index.ejs with the included values for result object
        // that has our title and body data
})



app.get('/post/:id', (req, res) => {

    BlogPost.findById(req.params.id).then(result => {
        console.log(result._id)
        res.render('post', {result})
    })

    //res.render('post')
    // use a parameter by adding /:id
    // then use it with req.params.id to get the post
    // with that id.  result obj is then passed to the 
    // postl.ejs view.
})




app.get('/about', (req, res) => {
    res.render('about')
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



