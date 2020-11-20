const express = require('express')
const router =express.Router()
const { ensureAuth,  } = require('../middleware/auth') 

const Bookmark = require('../models/Bookmark')
//@desc show add page
// @route GET/bookmark/add
router.get('/add',ensureAuth, (req,res) => {
    res.render('bookmarks/add')
})

//@desc process data
// @route POST/bookmarks
router.post('/',ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        var url=req.body.url;
        var hour=req.body.hour;
        hour=parseInt(hour,10);
        var minute=req.body.minute;
        minute=parseInt(minute,10);
        var seconds=req.body.seconds;
        seconds=parseInt(seconds,10);
        var p1="https://youtu.be/";
        var result;
        var time= (hour*3600)+(minute*60)+seconds;
        if(url.includes('youtube.com'))
        {
            var pos = url.indexOf("=");
            var ret = url.slice((pos+1));
            var p2=p1.concat(ret,"?t=");
            result=p2.concat(time);
        }
        else if(url.includes('youtu.be'))
        {
            var pos = url.lastIndexOf("/");
            var ret = url.slice((pos+1));
            var p2=p1.concat(ret,"?t=");
            result=p2.concat(time);
        }
        else
        {
            result=req.body.url;
        }
        req.body.url=result;
        await Bookmark.create(req.body);
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        res.render('errors/500')
    }
})

//@desc delete bookmark
// @route DELETE/bookmarks/:id
router.delete('/:id',ensureAuth, async (req,res) => {
   try {
       await Bookmark.remove({_id: req.params.id})
       res.redirect('/bookmarks')
   } catch (err) {
       console.error(err)
       return res.render('errors/500')
   }
})
module.exports = router