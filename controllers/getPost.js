

const BlogPost = require('../models/BlogPost.js')
var moment = require('moment')


module.exports = (req, res) => {

    BlogPost.findById(req.params.id).populate('userid').then(result => {
        console.log(result._id)
        //var dateOne = moment(result.datePosted).format('MM-DD-YYYY HH:mm')
        //console.log(dateOne)
        var dateTwo = result.datePosted
        console.log("dateTwo: " + result)
        res.render('post', { result, moment: moment, dateTwo: dateTwo })
    })

    //res.render('post')
    // use a parameter by adding /:id
    // then use it with req.params.id to get the post
    // with that id.  result obj is then passed to the
    // postl.ejs view.

}


