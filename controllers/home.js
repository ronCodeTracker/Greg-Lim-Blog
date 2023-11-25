

const BlogPost = require('../models/BlogPost.js')


module.exports = (req, res) => {


    //Display a list of blog posts (interacting with MongoDb)
    BlogPost.find({}).then(result => {
        console.log("result :" + result)
        console.log("session: " + req.session.userId)
        res.render('index', { result })
        // whenever the key name and the value name are the same
        // (e.g. blogposts: blogposts) we can shorten it to simply 'index',{blogposts}
        // or in our case result is out name for blogposts
        //  'index',{blogposts:blogposts}  is how it would be not shortened
        // index.ejs view now has access to the blogposts variable

    })

}


