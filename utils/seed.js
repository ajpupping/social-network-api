const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User } = require('../models/User');
const { Thought } = require('../models/Thought');

connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log('MongoDB connected');


    const users = [
        {
            username: "Luz",
            email: "luz@example.com",
            friends: ["Eda", "King", "Amity", "Willow", "Gus"]
        },
        {
            username: "Eda",
            email: "eda@example.com",
            friends: ["Luz", "King", "Amity"]
        },
        {
            username: "King",
            email: "king@example.com",
            friends: ["Luz", "Eda", "Amity"]
        },

        {
            username: "Amity",
            email: "amity@example.com",
            friends: ["Luz", "Eda", "Willow", "Gus", "King"]
        },
        {
            username: "Willow",
            email: "willow@example.com",
            friends: ["Luz", "Amity", "Gus"]
        },
        {
            username: "Gus",
            email: "gus@example.com",
            friends: ["Luz", "Amity", "Willow"]
        }
    ];

    const thoughts = [
        {
            thoughtText: "I'm Luz. The human. Hi!",
            username: "Luz",
            createdAt: new Date(),
            reactions: [{ reactionBody: "OMG, a human!", username: "Gus", createdAt: new Date() }]
        },
        {
            thoughtText: "Us weirdos have to stick together, you know?",
            username: "Eda",
            createdAt: new Date(),
            reactions: [{ reactionBody: "Absolutely Positutely!", username: "Luz", createdAt: new Date() }]
        },
        {
            thoughtText: "Soon, Mr. Ducky, we shall drink the fear of those who mocked us.",
            username: "King",
            createdAt: new Date(),
            reactions: [{ reactionBody: "Settle down", username: "Eda", createdAt: new Date() }]
        },
        {
            thoughtText: "Called my teacher mom again.",
            username: "Amity",
            createdAt: new Date(),
            reactions: [{ reactionBody: "Aww, babe", username: "Luz", createdAt: new Date() }]
        },
        {
            thoughtText: "Anyone want to join my Flyer Derby team?",
            username: "Willow",
            createdAt: new Date(),
            reactions: [{ reactionBody: "I'm in!", username: "Amity", createdAt: new Date() }]
        },
        {
            thoughtText: "You high five with your hands not your head.",
            username: "Gus",
            createdAt: new Date(),
            reactions: [{ reactionBody: "Really?", username: "Willow", createdAt: new Date() }]
        }
    ];

    console.log('Clearing data...');

    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('Data cleared. Seeding Users...');

    const seedUsers = await User.insertMany(users.map(({ username, email }) => ({ username, email })));

    const userMap = seedUsers.reduce((map, user) => {
        map[user.username] = user._id;
        return map;
    }, {});

    console.log('Users seeded. Retrieving Friends...')

    await Promise.all(users.map(async (user) => {
        const friendIds = user.friends.map(friend => userMap[friend]).filter(id => id);
        await User.findByIdAndUpdate(userMap[user.username],
            { $push: { friends: { $each: friendIds } } });
    }));


    console.log('Friends Seeded. Seeding thoughts and reactions...');

    for (const thought of thoughts) {
        const userId = userMap[thought.username];

        const newThought = await Thought.create({
            ...thought,
            user: userId,
            reactions: thought.reactions.map(reaction => ({
                ...reaction,
            }))
        });

        console.log('Thoughts seeded');

        console.log('Linking thoughts to users')
        await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
    }

    console.log('Data seeded');

    await mongoose.connection.close();
    console.log('MongoDB disconnected');
});
