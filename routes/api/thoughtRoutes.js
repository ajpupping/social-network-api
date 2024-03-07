const express = require('express');
const router = express.Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// get all thoughts
router.get('/thoughts', getAllThoughts);

// create a thought
router.post('/thoughts', createThought);

// get one thought by id
router.get('/thoughts/:id', getThoughtById);

// update a thought by id
router.put('/thoughts/:id', updateThought);

// delete a thought by id
router.delete('/thoughts/:id', deleteThought);

// add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;