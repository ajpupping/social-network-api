const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// get all users
router.get('/users', getAllUsers);

// create a user
router.post('/users', createUser);

// get one user by id
router.get('/users/:id', getUserById);

// update a user by id
router.put('/users/:id', updateUser);

// delete a user by id
router.delete('/users/:id', deleteUser);

// add a friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
