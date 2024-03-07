const connection = require('../config/connection');
const { User } = require('../models');
const { Thought } = require('../models');

connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log('MongoDB connected')
});

const users = [
    {
        username: "Luz",
        email: "luz@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "Eda",
        email: "eda@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "King",
        email: "king@example.com",
        thoughts: [],
        friends: []
    },

    {
        username: "Amity",
        email: "amity@example.com",
        thoughts: [],
        friends: []
    }, 
    {
        username: "Willow",
        email: "willow@example.com",
        thoughts: [],
        friends: []
    }, 
    {
        username: "Gus",
        email: "gus@example.com",
        thoughts: [],
        friends: []
    }
];

const thoughts = [
    {
        thoughtText: "I'm Luz. The human. Hi!",
        username: "Luz",
        reactions: []
    },
    {
        thoughtText: "Us weirdos have to stick together, you know?",
        username: "Eda",
        reactions: []
    },
    {
        thoughtText: "Soon, Mr. Ducky, we shall drink the fear of those who mocked us.",
        username: "King",
        reactions: []
    },
    {
        thoughtText: "Called my teacher mom again.",
        username: "Amity",
        reactions: []
    }, 
    {
        thoughtText: "Anyone want to join my Flyer Derby team?",
        username: "Willow",
        reactions: []
    }, 
    {
        thoughtText: "You high five with your hands not your head.",
        username: "Gus",
        reactions: []
    }
];


const seedDB = async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Data cleared');
    await User.insertMany(users);
    await Thought.insertMany(thoughts);
    console.log('Data seeded');
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log('MongoDB disconnected');
});