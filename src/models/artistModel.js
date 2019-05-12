import mongoose from 'mongoose';

// Setup schema
let artistSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	albums: [{ // The array stores multiple IDs, creating a one-to-many "relationship"
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Album'
	}],
},{
	timestamps: true
});

// Export Artist model
export default mongoose.model('Artist', artistSchema);