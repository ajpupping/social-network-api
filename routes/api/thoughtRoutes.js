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
router.get('/', getAllThoughts);

// create a thought
router.post('/', createThought);

// get one thought by id
router.get('/:id', getThoughtById);

// update a thought by id
router.put('/:id', updateThought);

// delete a thought by id
router.delete('/:id', deleteThought);

// add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;