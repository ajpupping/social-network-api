const Thought = require('../models/Thought');

// get all thoughts
exports.getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a thought
exports.createThought = async (req, res) => {
    try {
        const thought = new Thought(req.body);
        await thought.save();
        res.status(200).json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

// get one thought by id
exports.getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id });
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

// update a thought by id
exports.updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true });
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

// delete a thought by id
exports.deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.id });
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

// add a reaction to a thought
exports.addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true });
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

// remove a reaction from a thought
exports.removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true });
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};