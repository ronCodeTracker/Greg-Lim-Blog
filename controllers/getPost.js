

const BlogPost = require('../models/BlogPost.js')



module.exports = (req, res) => {

    BlogPost.findById(req.params.id).populate('userid').then(result => {
        console.log(result._id)
        res.render('post', { result })
    })

    //res.render('post')
    // use a parameter by adding /:id
    // then use it with req.params.id to get the post
    // with that id.  result obj is then passed to the
    // postl.ejs view.

}


