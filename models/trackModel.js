const Mongoose = require('mongoose');

// Setup schema
let trackSchema = Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artists: [{ // The array stores multiple IDs, creating a one-to-many "relationship"
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'artist'
    }],
    album: { // No arrays, as we want to store a single ID only.
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'album'
    } ,
},{
	timestamps: true
});

// Export Track model
module.exports = Mongoose.model('track', trackSchema);