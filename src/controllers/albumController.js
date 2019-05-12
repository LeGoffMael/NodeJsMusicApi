// Import models
import Album from '../models/albumModel';
import Artist from '../models/artistModel';

export default class AlbumController {

	/**
	 * @constructor
	 */
	constructor() {}

	/**
	 * GET /albums
	 * Retrieve all Albums
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async getAll(req, res) {
		Album.find().populate('artist', '_id name firstName lastName')
		.then(albums => {
			res.status(200).json(albums);
		}).catch(err => {
			console.log("Error retrieving albums :" + err);
			return res.status(500).json({
				error: 'Failed to find albums.'
			});
		});
	}

	/**
	 * GET /albums/:album_id
	 * Retrieve a single Album with is album_id
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async getById(req, res) {
		Album.findById(req.params.album_id).populate('artist', '_id name firstName lastName')
		.then(album => {
			if(!album) {
				return res.status(404).json({
					error: 'Album doesn\'t exist.'
				});
			}
			res.status(200).json(album);
		}).catch(err => {
			console.log("Error retrieving Album id ["+req.params.album_id+"] :" + err);
			return res.status(500).json({
				error: "Error retrieving album."
			});
		});
	}

	/**
	 * POST /albums
	 * Create and save a new Album, add it to the specified Artist
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async create(req, res) {
		// Check if artist is existing
		Artist.findById(req.body.artist)
		.then(artist => {
			if(!artist) {
				return res.status(404).json({
					error: 'Artist doesn\'t exist.'
				});
			}
			let album = new Album(req.body);
			album.artist = artist;
			
			album.save()
			.then(album => {
				// Add album to artist
				Artist.findByIdAndUpdate(album.artist,
					{$push: {albums: album}},
					{safe: true, upsert: true},
					function(err, doc) { if(err) { console.log(err); } }
				);
				
				res.status(201).json(album);
			}).catch(err => {
				console.log("Error Album creation :" + err);
				return res.status(500).json({
					error: 'Failed to create an album.'
				});
			});		
		}).catch(err => {
			console.log("Error retrieving Artist id ["+req.params.artist_id+"] while Album creation :" + err);
			return res.status(500).json({
				error: "Error retrieving artist of album."
			});
		});
	}

	/**
	 * PUT /albums/:album_id
	 * Update an Album identified by the album_id in the request
	 * @param {*} req express request
     * @param {*} res express response
     * @returns data and status code
	 */
	async update(req, res) {
		Album.findByIdAndUpdate(req.params.album_id, req.body, {new: true})
		.then(album => {
			if(!album) {
				return res.status(404).json({
					error: 'Album doesn\'t exist.'
				});
			}
			res.status(200).json(album);
		}).catch(err => {
			return res.status(500).json({
				error: 'Failed to update album.'
			});
		});
	}

	/**
	 * Delete /albums/:album_id
	 * Delete an Album & remove it from Artist with the specified album_id in the request
	 * @param {*} req express request
     * @param {*} res express response
     * @returns success and status code
	 */
	async delete(req, res) {
		Album.findByIdAndRemove(req.params.album_id)
		.then(album => {
			if(!album) {
				return res.status(404).json({
					error: 'Album doesn\'t exist.'
				});
			}
			
			// Remove album from artist
			Artist.findByIdAndUpdate(album.artist,
				{$pull: {albums: req.params.album_id}},
				{safe: true, upsert: true},
				function(err, doc) { if(err) { console.log(err); } }
			);
			
			res.status(200).json({
				success: true
			});
		}).catch(err => {
			return res.status(500).json({
				error: 'Failed to update album.'
			});
		});
	}

	/** From Artist part **/

	/**
	 * GET /artists/:artist_id/albums
	 * Retrieve all the albums of the Artist by is artist_id
	 * @param {*} req express request
	 * @param {*} res express response
	 * @returns artist albums data and status code
	 */
	async getArtistAlbums(req, res) {
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
	}

	/**
	 * POST /artists/:artist_id/albums
	 * Create a new Album associated to the Artist identified by is artist_id
	 * @param {*} req express request
	 * @param {*} res express response
	 * @returns artist album data and status code
	 */
	async createArtistAlbum(req, res) {
		// Set Artist id
		req.body.artist = req.params.artist_id;

		return await new AlbumController().create(req, res);
	}

	/**
	 * GET /artists/:artist_id/albums/:album_id
	 * TODO : Retrieve a single Album identified by the album_id and associated to the Artist identified by the artist_id
	 * @param {*} req express request
	 * @param {*} res express response
	 * @returns artist album data and status code
	 */
	async getArtistAlbumById(req, res) {
		return res.status(501).json({
			error: 'Endpoint not implemented yet.'
		});
	}

	/**
	 * PUT /artists/:artist_id/albums/:album_id
	 * TODO : Update an Album identified by the album_id in the request and associated to the Artist identified by the artist_id
	 * @param {*} req express request
	 * @param {*} res express response
	 * @returns data and status code
	 */
	async updateArtistAlbum(req, res) {
		return res.status(501).json({
			error: 'Endpoint not implemented yet.'
		});
	}

	/**
	 * DELETE /artists/:artist_id/albums/:album_id
	 * TODO : Delete an Album identified by the album_id and remove it from the associated Artist identified by the artist_id
	 * @param {*} req express request
	 * @param {*} res express response
	 * @returns success and status code
	 */
	async deleteArtistAlbum(req, res) {
		return res.status(501).json({
			error: 'Endpoint not implemented yet.'
		});
	}

}