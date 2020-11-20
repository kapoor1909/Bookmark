module.exports = {
    //function to ensure that the user is authenticated
    ensureAuth: function (req, res, next) {
        if(req.isAuthenticated()){
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function( req, res, next){
        if(req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else{
            return next()
        }
    }
}