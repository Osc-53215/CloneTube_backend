const {Comments,Replies} = require('../models/Comments')
const express = require('express');
const router = express.Router();


//GET ID for comments

router.get('/:id', async (req, res) => {
    try {

        const comments = await Comments.find({videoId: req.params.id});

        if (!comments)
            return res.status(400).send(`The comment with id ${req.params.id} does not exist.`);

            return res.send(comments);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 

// POST route for comments

router.post('/:id', async (req, res) => {
    try {

        const comments = new Comments({
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            replies: req.body.replies,
            videoId: req.body.videoId
        });

        await comments.save();

        return res.send(comments);

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//POST route for replies

router.post('/:id', async (req, res) => {
    try {

        const replies = new Replies({
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
        });

        await replies.save();

        return res.send(Comments);

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// PUT route for likes and dislikes

router.put('/:id', async (req, res) => {
    try {

        const comments = await Comments.findByIdAndUpdate(
            req.params.id,
            {
                likes: req.body.likes,
                dislikes: req.body.dislikes,
            },
            { new: true }
        );

        if (!comments)
            return res.status(400).send(`The comment with is "${req.params.id}" does not exist.`);

            await comments.save();

            return res.send(comments);  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// PUT route for replies

router.post('/:id', async (req, res) => {
    try {

        const comments = await Comments.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
            },
            { new: true }
        );

        if (!comments)
            return res.status(400).send(`The comment with is "${req.params.id}" does not exist.`);

            await comments.save();

            return res.send(comments);  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;