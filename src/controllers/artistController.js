// Import models
import Artist from '../models/artistModel';
import Album from '../models/albumModel';

export default class ArtistController {

	/**
	 * @constructor
	 */
	constructor() {}

	/**
	 * GET /artists
	 * Retrieve all Artists
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async getAll(req, res) {
		Artist.find().populate('albums', '_id title cover year')
		.then(artists => {
			res.status(200).json(artists);
		}).catch(err => {
			console.log("Error retrieving artists :" + err);
			return res.status(500).json({
				error: 'Failed to find Artists.'
			});
		});
	}

	/**
	 * GET /artists/:artist_id
	 * Retrieve a single Artist with is artist_id
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async getById(req, res) {
		Artist.findById(req.params.artist_id).populate('albums', '_id title cover year')
		.then(artist => {
			if(!artist) {
				return res.status(404).json({
					error: 'Artist does not exist.'
				});
			}
			res.status(200).json(artist);
		}).catch(err => {
			console.log("Error retrieving Artist id ["+req.params.artist_id+"] :" + err);
			return res.status(500).json({
				error: "Error retrieving Artist."
			});
		});
	}

	/**
	 * POST /artists
	 * Create and save a new Artist
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async create(req, res) {
		let artist = new Artist(req.body);
	
		artist.save()
		.then(artist => {
			res.status(201).json(artist);
		}).catch(err => {
			console.log("Error Artist creation :" + err);
			return res.status(500).json({
				error: 'Failed to create an Artist.'
			});
		});
	}

	/**
	 * PUT /artists/:artist_id
	 * Update an Artist identified by the artist_id in the request
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async update(req, res) {
		Artist.findByIdAndUpdate(req.params.artist_id, req.body, {new: true})
		.then(artist => {
			if(!artist) {
				return res.status(404).json({
					error: 'Artist does not exist.'
				});
			}
			res.status(200).json(artist);
		}).catch(err => {
			return res.status(500).json({
				error: 'Failed to update Artist.'
			});
		});
	}

	/**
	 * DELETE /artist/:artist_id
	 * Delete an Artist and his Albums with the specified artist_id in the request
	 * @param {*} req express request
     * @param {*} res express response
     * @returns success and status code
	 */
	async delete(req, res) {
		Artist.findByIdAndRemove(req.params.artist_id)
		.then(artist => {
			if(!artist) {
				return res.status(404).json({
					error: 'Artist does not exist.'
				});
			}
			
			// Delete all Albums from Artist
			Album.deleteMany({artist: req.params.artist_id}, function(err) { 
				if(err != null) {
					console.log('Error deleting album(s) of Artist : ' + err);
					return res.status(500).json({
						error: 'Error deleting album(s) of Artist.'
					});
				}
			});
			
			res.status(200).json({
				success: true
			});
		}).catch(err => {
			return res.status(500).json({
				error: 'Failed to delete Artist.'
			});
		});
	}
}