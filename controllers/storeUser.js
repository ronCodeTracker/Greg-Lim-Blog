



const User = require('../models/User.js')

const path = require('path')


module.exports = (req, res) => {
    if (req != null) {
        User.create(req.body).then(result => {


            console.log("result = " + result)
            res.redirect('/')

        })
            .catch((err) => {
                console.log("err: " + err)

                try {

                    const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message)
                    console.log("val errors: " + validationErrors)
                    req.flash('validationErrors',validationErrors)
                    //req.session.validationErrors = validationErrors
                    req.flash('data',req.body)

                }
                catch {
                    req.flash('validationError',err.toString())
                    //req.session.validationError = err.toString()
                    req.flash('data',req.body)
                }
                
                
                
                
                res.redirect('/auth/register')
            })
    }

}
