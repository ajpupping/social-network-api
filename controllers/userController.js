const { User } = require('../models/User');

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}; 

// get one user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

// update a user by id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

// delete a user by id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(
            { _id: req.params.id });
        res.json(user);
    }catch (error) {
        res.status(400).json(error);
    }   
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};