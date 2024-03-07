const { Thought } = require('../models/Thought');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a thought
    async createThought(req, res) {
        try {
            const thought = new Thought(req.body);
            await thought.save();
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.id }
                );
            // check if thought exists
            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            // check if thought exists
            if (!thought) {
                res.status(404).json({ message: 'No thought found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.id }
                );

            // check if thought exists
            if (!thought) {
                res.status(404).json({ message: 'No thought found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};