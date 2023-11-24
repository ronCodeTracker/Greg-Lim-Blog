

const express = require('express')


// not needed any more...   ************************
//const path = require('path')
//const BlogPost = require('./models/BlogPost.js')
//    **********************************************


const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const app = new express()
app.use(fileUpload())
const ejs = require('ejs')
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
const validateMiddleWare = require('./middleware/validateMiddleware')
app.use('/posts/store', validateMiddleWare)
//   ************************************************************









// home page request handler *****************************************
const homeController = require('./controllers/home.js')
app.get('/', homeController)
//  *************************************************************



//  search request handler  ***************************************************
const searchPostsController = require('./controllers/searchPosts.js')
app.post('/', searchPostsController)
//   *****************************************************************************


//  get a  post with the mondodb id request handler  *****************************
const getPostController = require('./controllers/getPost.js')
app.get('/post/:id', getPostController)
//   *****************************************************************************




//  Go to Page for form to make a new post request handler   ******************
const newPostController = require('./controllers/newPost.js')
app.get('/posts/new', newPostController)
//  *******************************************************************


//  create a post in mongodb handler  ************************************
const storePostController = require('./controllers/storePost.js')
app.post('/posts/store', storePostController)
//  **********************************************************************


//  Go to NewUser page for new user form to add user info to mongodb database request handler
const newUserController = require('./controllers/newUser')
app.get('/auth/register', newUserController)
//   ****************************************************************************************


//  create User and Password data in mongodb database request handler  ************
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', storeUserController)
//   ******************************************************************************


// import the login controller  ***************************
const loginController = require('./controllers/login')
app.get('/auth/login', loginController)
//  *******************************************************


//  use loginUser Controller to check username and password
const loginUserController = require('./controllers/loginUser')
app.post('/users/login', loginUserController)
//  ********************************************************


