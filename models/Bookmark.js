const mongoose = require('mongoose')

const BookmarkSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hour:{
        type: Number,
        default:0
    },
    minute:{
        type: Number,
        default:0
    },
    seconds:{
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Bookmark', BookmarkSchema)