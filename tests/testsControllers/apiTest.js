import ArtistTest from '../testsControllers/artistTest';
import AlbumTest from '../testsControllers/albumTest';

import Artist from '../../src/models/artistModel';

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

        this.artistTest = new ArtistTest(this._app, '/api/v1/artists');
        this.testArtists();

        this.albumTest = new AlbumTest(this._app, '/api/v1/albums', new Artist(this.artistTest.getArtistContent()));
        this.testAlbums();
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
     */
    testArtists() {
        this.artistTest.startAllTests();
    }

    /**
     * Test Albums V1 API side
     */
    testAlbums() {
        this.albumTest.startAllTests();
    }
}