

const BlogPost = require('../models/BlogPost.js')

const path = require('path')

module.exports = (req, res) => {


    let image = req.files.image
    
    image.mv(path.resolve(__dirname,'..', 'public/assets/img', image.name), async (error) => {
        
        //console.log(req.body)        
        BlogPost.create({ ...req.body, image: '/assets/img/' + image.name }).then(
            res.redirect('/'))

        })

}


