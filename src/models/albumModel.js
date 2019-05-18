import mongoose from 'mongoose';

// Setup schema
let albumSchema = mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
},{
	timestamps: true
});

albumSchema.virtual('links').get(function() {
    return {
        self: {
            'href': '/api/v1/albums/' + this.id
        },
        related: {
            'href': '/api/v1/albums'
        }
    }
});

// Export Album model
export default mongoose.model('Album', albumSchema);