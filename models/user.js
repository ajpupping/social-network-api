const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true},
        email: {
            type: String,
            required: true,
            unique: true,
            // email regex for validation
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        // thoughts array, matching the Thought model's schema
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // friends array, matching the User model's schema (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, 
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });


const User = mongoose.model('User', UserSchema);

module.exports = { User };