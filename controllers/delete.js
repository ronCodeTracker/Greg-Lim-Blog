

const BlogPost = require('../models/BlogPost.js')

module.exports = (req, res) => {


    //Display a list of blog posts (interacting with MongoDb)
    console.log("id: " + req.session.userId)
    BlogPost.find({"userid": req.session.userId}).populate('userid').then(result => {
        console.log("result :" + result[0]._id)
        console.log("session: " + req.session.userId)
        console.log("crackers2")
        BlogPost.findByIdAndDelete(result[0]._id).then(result => {
            res.redirect('/')
        }).catch(
            error =>{
                console.log("error del: " + error)
                res.render('/posts/new')
            }
        )
        //res.send('/')
        // whenever the key name and the value name are the same
        // (e.g. blogposts: blogposts) we can shorten it to simply 'index',{blogposts}
        // or in our case result is out name for blogposts
        //  'index',{blogposts:blogposts}  is how it would be not shortened
        // index.ejs view now has access to the blogposts variable

    }).catch(
        error =>{
            console.log("cracker2error")
            console.log("error: " + error)
            res.render('/posts/new')
        }
    )

}





