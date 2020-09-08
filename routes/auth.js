const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /
router.get('/google', passport.authenticate('google',{ scope: [ 'profile' ] }))

//@desc Google Auth callback
//@route GET/auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google',{ failiureRedirect: 
    '/' }), (req, res) => {
        res.redirect('/dashboard')
    } )


module.exports = router