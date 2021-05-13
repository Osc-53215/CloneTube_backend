const mongoose = require('mongoose');


const replySchema = new mongoose.Schema({
    text: {type: String, required: true, minlength: 2, maxlength: 300},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
})

const Replies = mongoose.model('Replies', replySchema);

const commentSchema = new mongoose.Schema({
    text: {type:  String, require: true, minlength:2, maxlength: 300},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: [{type: replySchema}],
    videoId: {type: String, require: true},
    date: {type: Date, default: Date.now}
})

const Comments = mongoose.model('Comments', commentSchema);


exports.Replies = Replies;
exports.replySchema = replySchema;
exports.Comments = Comments;
exports.commentSchema = commentSchema;
