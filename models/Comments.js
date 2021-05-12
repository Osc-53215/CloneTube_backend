const mongoose = require('mongoose');
const Joi = require('joi');


const replySchema = new mongoose.Schema({
    text: {type: String, required: true, minlength: 2, maxlength: 300},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
})

const Replies = mongoose.model('Replies', replySchema);

function validateReplies(replies) {
    const schema = Joi.object({
        text: Joi.string().min(2).max(300).required(),
        likes: Joi.number(),
        dislikes: Joi.number()
    });
    return schema.validate(replies);
}


const commentSchema = new mongoose.Schema({
    text: {type:  String, require: true, minlength:2, maxlength: 300},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: [{type: replySchema}],
    videoId: {type: String, require: true},
    date: {type: Date, default: Date.now}
})

const Comments = mongoose.model('Comments', commentSchema);

function validateComments(comments) {
    const schema = Joi.object({
        text: Joi.string().min(2).max(300).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        replies: Joi.object(),
        videoId: Joi.string().required(),
    });
    return schema.validate(comments);
}



exports.Replies = Replies;
exports.validate = validateReplies;
exports.replySchema = replySchema;

exports.Comments = Comments;
exports.validate = validateComments;
exports.commentSchema = commentSchema;
