const express = require('express')
const router =express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth') 
const { db, collection } = require('../models/Bookmark')

const Bookmark = require('../models/Bookmark')
//@desc Login/landing Page
// @route GET/
router.get('/', ensureGuest,  (req,res) => {
    res.render('login')
})

//@desc Dashboard
// @route GET/dashboard 
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id })
        const length=bookmarks.length;
        //collection.deleteOne(bookmarks[0]);
        console.log(length)
        res.render('dashboard', {
            name: req.user.firstName,
            length,
            bookmarks
        })
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }

    
})
//@desc Bookmark
// @route GET/bookmarks
router.get('/bookmarks', ensureAuth, async (req,res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id })
        const length=bookmarks.length;
        //collection.deleteOne(bookmarks[0]);
        console.log(length)
        res.render('bookmark', {
            name: req.user.firstName,
            length,
            bookmarks
        })
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }  
})
//@desc 404
// @route GET/404
router.get('/404', ensureAuth, async (req,res) => {
        res.render('errors/404')   
})
//@desc 500
// @route GET/500
router.get('/500', ensureAuth, async (req,res) => {
    res.render('errors/500')
})

module.exports = router