

const BlogPost = require('../models/BlogPost.js')

const path = require('path')

module.exports = (req, res) => {


    let image = req.files.image
    console.log("got this far")
    image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name), async (error) => {

        //console.log(req.body)        
        BlogPost.create({ ...req.body, image: '/assets/img/' + image.name }).then(result => {

            //console.log(error)
            res.redirect('/')
        })
        .catch((err)=>{


            console.log("errpost: " + err)
            try{
                const validationErrors2 = Object.keys(err.errors).map(key => err.errors[key].message )
                console.log("valitdate errors: " + validationErrors2)
                req.flash('validationErrors2', validationErrors2)
                
            }
            catch {

                req.flash('validationError2', err.toString())
                

            }

            res.redirect('/posts/new')

        })

    })
}


