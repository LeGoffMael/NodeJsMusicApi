import mongoose from 'mongoose';

import ArtistTest from '../testsControllers/artistTest';
import AlbumTest from '../testsControllers/albumTest';

// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';

export default class ApiTest {

     /**
      * @constructor
      * @param {*} app Running application
      */
    constructor(app) {
        this._app = app;

        chai.should();
        chai.use(chaiHttp);

        this.init();
    }

    /**
     * Call each testing methods
     */
    init() {
        this.testMainPage('/api/v1');
        this.testArtists('/api/v1/artists');
        this.testAlbums('/api/v1/albums');
    }

    /**
     * Test API V1 Main page
     */
    testMainPage(mainPageApiUrl) {
        describe ('Main page', () => {
            it('Main page content', (done) => {
                chai.request(this._app)
                    .get(mainPageApiUrl)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    }

    /**
     * Test Artists V1 API side
     * @param {*} artistApiUrl API URL to access to artists data
     */
    testArtists(artistApiUrl) {
        const artistTest = new ArtistTest(this._app, artistApiUrl);
    }

    /**
     * Test Albums V1 API side
     * @param {*} albumApiUrl API URL to access to albums data
     */
    testAlbums(albumApiUrl) {
        const albumTest = new AlbumTest(this._app, albumApiUrl);
    }
}