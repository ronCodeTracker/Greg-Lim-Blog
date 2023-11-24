



const User = require('../models/User.js')

const path = require('path')


module.exports = (req, res) => {
    if (req != null) {
        User.create(req.body).then(result => {


            console.log("result = " + result)
            res.redirect('/')

        })
            .catch((err) => {
                console.log(err)
                res.redirect('/auth/register')
            })
    }

}
