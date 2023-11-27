





const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }).then(result => {
        if (result) {
            bcrypt.compare(password, result.password, (error, same) => {
                if (same) {
                    //if passwords match
                    // store user session, will talk about it later
                    req.session.userId = result._id

                    res.redirect('/')
                }
                else {
                    console.log("passwords not the same " + password)
                    req.flash('passwordWrong', "Password is wrong")
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            console.log("result null: " + result)
            req.flash('usernameNotFound', "Username was not found")
            res.redirect('/auth/login')
        }
    })
        .catch(x=>{
            console.log("username not there" + x)
            req.flash('usernameNotFound', "Username was not found")
            res.redirect('/auth/login')
        })
             

}





