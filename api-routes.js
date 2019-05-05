// Initialize express router
let Router = require('express').Router();

// Set default API response
Router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import artist controller
let artistController = require('./controllers/artistController');
// Artist routes
Router.route('/artists')
    .get(artistController.findAll)
    .post(artistController.create);
Router.route('/artists/:artist_id')
    .get(artistController.findOne)
    .patch(artistController.update)
    .put(artistController.update)
    .delete(artistController.delete);
Router.route('/artists/:artist_id/albums')
    .get(artistController.getArtistAlbums)
    .post(artistController.newArtistAlbum);

// Import artist controller
let albumController = require('./controllers/albumController');
// Artist routes
Router.route('/albums')
    .get(albumController.findAll)
    .post(albumController.create);
Router.route('/albums/:album_id')
    .get(albumController.findOne)
    .patch(albumController.update)
    .put(albumController.update)
    .delete(albumController.delete);

// TODO : trackController

// Export API routes
module.exports = Router;