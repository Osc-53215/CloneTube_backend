const {Comments, validate} = require('../models/Comments')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const comments = await Comments.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const comments = await Comments.findById(req.params.id);

        if (!comments)
            return res.status(400).send(`The comment with id ${req.params.id} does not exist.`);

            return res.send(comments);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
        return res.status(400).send(error);

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


router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                front: req.body.front,
                back: req.body.back,
            },
            { new: true }
        );

        if (!flashcard)
            return res.status(400).send(`The flashcar with is "${req.params.id}" does not exist.`);

            await flashcard.save();

            return res.send(flashcard);  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            return res.send(flashcard);
    
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;