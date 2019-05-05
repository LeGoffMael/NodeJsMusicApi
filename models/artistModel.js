const Mongoose = require('mongoose');

// Setup schema
let artistSchema = Mongoose.Schema({
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
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'album'
	}],
},{
	timestamps: true
});

// Export Artist model
module.exports = Mongoose.model('artist', artistSchema);