// Import models
Artist = require('../models/artistModel');
Album = require('../models/albumModel');

// Retrieve all Artists from the database
exports.findAll = (req, res) => {
	Artist.find().populate('albums', '_id title cover year')
	.then(artists => {
		res.status(200).json(artists);
	}).catch(err => {
		console.log("Error retrieving artists :" + err);
		return res.status(500).json({
			error: 'Failed to find artists.'
		});
	});
};

// Find a single Artist with is artist_id
exports.findOne = (req, res) => {
	Artist.findById(req.params.artist_id).populate('albums', '_id title cover year')
	.then(artist => {
		if(!artist) {
			return res.status(404).json({
				error: 'Artist doesn\'t exist.'
			});
		}
		res.status(200).json(artist);
	}).catch(err => {
		console.log("Error retrieving Artist id ["+req.params.artist_id+"] :" + err);
		return res.status(500).json({
			error: "Error retrieving artist."
		});
	});
};

// Create and save a new Artist
exports.create = (req, res) => {	
    let artist = new Artist(req.body);
	
	artist.save()
	.then(artist => {
		res.status(201).json(artist);
	}).catch(err => {
		console.log("Error Artist creation :" + err);
		return res.status(500).json({
			error: 'Failed to create an artist.'
		});
	});
};

// Update an Artist identified by the artist_id in the request
exports.update = (req, res) => {
	Artist.findByIdAndUpdate(req.params.artist_id, req.body, {new: true})
	.then(artist => {
		if(!artist) {
			return res.status(404).json({
				error: 'Artist doesn\'t exist.'
			});
		}
		res.status(200).json(artist);
	}).catch(err => {
		return res.status(500).json({
			error: 'Failed to update artist.'
		});
	});
};

// Delete an Artist and his Albums with the specified artist_id in the request
exports.delete = function (req, res) {
	Artist.findByIdAndRemove(req.params.artist_id)
	.then(artist => {
		if(!artist) {
			return res.status(404).json({
				error: 'Artist doesn\'t exist.'
			});
		}
		
		// Delete Albums from Artist
		Album.deleteMany({artist: req.params.artist_id}, function(err) { console.log(err); });
		
		res.status(200).json({
			success: true
		});
	}).catch(err => {
		return res.status(500).json({
			error: 'Failed to delete artist.'
		});
	});
};

/* Artist albums */
// Retrieve all the albums of the Artist by is artist_id
exports.getArtistAlbums = (req, res) => {	
	Artist.findById(req.params.artist_id).populate('albums', '_id title cover year')
	.then(artist => {
		if(!artist) {
			return res.status(404).json({
				error: 'Artist doesn\'t exist.'
			});
		}
		res.status(200).json(artist.albums);
	}).catch(err => {
		console.log("Error retrieving albums from artist id ["+req.params.artist_id+"] :" + err);
		return res.status(500).json({
			error: "Error retrieving albums from artist."
		});
	});
};

exports.newArtistAlbum = (req, res) => {
	/*const newAlbum = new Album(req.value.body)
	newCar.seller = await User.findById(req.value.params.id)
	await newCar.save()
	const user = await User.findByIdAndUpdate(req.value.params.id, {
		$push: { cars: newCar }
	})

	res.status(200).json(newCar)*/
};