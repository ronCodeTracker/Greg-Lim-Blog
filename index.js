

const express = require('express')


// not needed any more...   ************************
//const path = require('path')
//const BlogPost = require('./models/BlogPost.js')
//    **********************************************


const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

const app = new express()
app.use(fileUpload())
app.use(flash())
const ejs = require('ejs')
const { request } = require('http')

app.set('view engine', 'ejs')

mongoose.connect( process.env.DB_NAME2 )

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

}))





app.listen(80, () => {
    console.log('Listening on port 80')
})


global.loggedIn = null;


app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
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

//   middleware  *********************************************************************************
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
//   *********************************************************************************************

//    logout ************************************************************************************
const logoutController = require('./controllers/logout')
//     ******************************************************************************************



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



//  Go to NewUser page for new user form to add user info to mongodb database request handler
const newUserController = require('./controllers/newUser')
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
//   ****************************************************************************************


//  create User and Password data in mongodb database request handler  ************
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
//   ******************************************************************************


// import the login controller  ***************************
const loginController = require('./controllers/login')
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
//  *******************************************************


//  use loginUser Controller to check username and password
const loginUserController = require('./controllers/loginUser')
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
//  ********************************************************

// Middleware for protecting pages (signin a must for posting in blog app)
const authMiddleware = require('./middleware/authMiddleware')
app.use('/posts/new', authMiddleware, newPostController)
//  **********************************************************************


//  create a post in mongodb handler  ************************************
const storePostController = require('./controllers/storePost.js')
const logout = require('./controllers/logout')
app.post('/posts/store', authMiddleware, storePostController)
//  **********************************************************************


//  logout request handler  **********************
app.get('/auth/logout', logoutController)
//  **********************************************


app.use((req, res) => {
    res.render('notfound')
})





