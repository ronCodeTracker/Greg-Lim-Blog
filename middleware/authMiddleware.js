



const User = require('../models/User')


module.exports = (req, res, next) => {
    
    User.findById(req.session.userId).then(result => {
        next()
        
    })
        .catch(err => {
            console.log("error: " + err)
            res.redirect('/')
        })
}



