

const BlogPost = require('../models/BlogPost.js')

const path = require('path')

module.exports = (req, res) => {


    let image = req.files.image
    console.log("start")
    image.mv(path.resolve(__dirname,'..', 'public/assets/img', image.name), async (error) => {
        console.log("before")
        console.log(req.body)
        console.log("next")
        BlogPost.create({ ...req.body, image: '/assets/img/' + image.name }).then(
            res.redirect('/'))
        })

}


