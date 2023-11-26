



const User = require('../models/User')


module.exports = (req, res, next) => {
    console.log("start middleware")
    User.findById(req.session.userId).then(result => {
        console.log("middleware ")
        next()
        
    })
        .catch(err => {
            console.log("error: " + err)
            res.redirect('/')
        })
}



