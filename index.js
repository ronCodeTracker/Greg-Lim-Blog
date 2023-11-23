

const express = require('express')

const path = require('path')

const mongoose = require('mongoose')

const fileUpload = require('express-fileupload')



const app = new express()


app.use(fileUpload())

const ejs = require('ejs')

// new November 18, 2023
const BlogPost = require('./models/BlogPost.js')
const { request } = require('http')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/my_database2')

app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({extended:true}))





app.listen(4000, () => {
    console.log('Listening on port 4000')
})


// example of making your own middleware ***********************

const customMiddleWare = (req, res, next) => {
    console.log('Custom middleware called')
    next()
}

app.use(customMiddleWare)

//  *************************************************************
// another middleware *******************************************

const validateMiddleWare = (req, res, next) => {

    console.log(req.files)
    console.log("posts/store in use....")
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateMiddleWare)

//   ************************************************************


// home request handler *****************************************
const homeController = require('./controllers/home.js')
app.get('/', homeController)
//  *************************************************************


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




//  Go to Page for form to make a new post handler   ******************
const newPostController = require('./controllers/newPost.js')
app.get('/posts/new', newPostController)
//  *******************************************************************


//  create a post in mongodb handler  ************************************
const storePostController = require('./controllers/storePost.js')
app.post('/posts/store', storePostController)
//  **********************************************************************    




