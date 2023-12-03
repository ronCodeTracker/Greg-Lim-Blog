


const BlogPost = require('../models/BlogPost.js')

var moment = require('moment')


module.exports = (req, res) => {
   
    BlogPost.find({ $text: { $search: req.body.searchdata } }).then(result => {
        console.log(result)
        res.render('index', { result, moment: moment })
    })

        // using index in models folder BlogPost.js
        // we then search for  string that is in searchdata element
        // then mongodb finds the post that matches
        // then we render index.ejs with the included values for result object
        // that has our title and body data

}

