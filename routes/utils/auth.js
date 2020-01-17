var auth = (req, res,next) => {
    if (req.session.validate !== true) {
        res.redirect('/admin');        
    }else{
        next();
    }
}

module.exports = {
    auth
}