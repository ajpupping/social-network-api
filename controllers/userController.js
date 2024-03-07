const { User } = require('../models/User');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a user
    async createUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.id }
            );

            // check if user exists
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            // check if user exists
            if (!user) {
                res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.id }
            );
            // check if user exists
            if (!user) {
                res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};