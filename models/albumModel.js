const Mongoose = require('mongoose');

// Setup schema
let albumSchema = Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: { // TODO : change to real image
        type: String,
        required: true
    },
	year: {
        type: Number,
        required: true
    },
    artist: { // No arrays, as we want to store a single ID only.
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'artist'
    } ,
},{
	timestamps: true
});

// Export Album model
module.exports = Mongoose.model('album', albumSchema);