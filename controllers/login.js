



module.exports = (req, res) => {




    res.render('login', { passwordWrong: req.flash('passwordWrong'), usernameNotFound: req.flash('usernameNotFound') })

}



