import Router from 'express';
import ArtistController from '../controllers/artistController';
import AlbumController from '../controllers/albumController';

export default class ApiRouter {

    /**
     * @constructor
     */
    constructor() {
        this._artistsPath = 'artists';
        this._albumsPath = 'albums';

        this._router = new Router();

        this._artistController = new ArtistController();
        this._albumController = new AlbumController();

        // Set default API response
        this._router.get('/', function (req, res) {
            res.json({
                status: 'API Its Working',
                message: 'Welcome to RESTHub crafted with love!',
            });
        });

        this.artistsInit();
        this.albumsInit();
    }

    /**
     * Set all Artist endpoints
     */
    artistsInit() {
        this._router.route(`/${this._artistsPath}`)
            .get(this._artistController.getAll)
            .post(this._artistController.create);
        this._router.route(`/${this._artistsPath}/:artist_id`)
            .get(this._artistController.getById)
            .put(this._artistController.update)
            .delete(this._artistController.delete);
    }

    /**
     * Set all Album endpoints
     */
    albumsInit() {
        this._router.route(`/${this._albumsPath}`)
            .get(this._albumController.getAll)
            .post(this._albumController.create);
        this._router.route(`/${this._albumsPath}/:album_id`)
            .get(this._albumController.getById)
            .put(this._albumController.update)
            .delete(this._albumController.delete);

        // Set albums endpoints from artists
        this._router.route(`/${this._artistsPath}/:artist_id/${this._albumsPath}`)
            .get(this._albumController.getArtistAlbums)
            .post(this._albumController.createArtistAlbum);
        this._router.route(`/${this._artistsPath}/:artist_id/${this._albumsPath}/:album_id`)
            .get(this._albumController.getArtistAlbumById)
            .put(this._albumController.updateArtistAlbum)
            .delete(this._albumController.deleteArtistAlbum);
    }

    /**
     * Get Express router
     * @returns {Router}
     */
    get() {
        return this._router;
    }
}