import mongoose from 'mongoose';
import Album from '../../src/models/albumModel';
// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';

export default class AlbumTest {

    /**
     * @constructor
     * @param {*} app Running application
     * @param {*} albumApiUrl API URL to access to albums data
     */
    constructor(app, albumApiUrl) {
        this._app = app;
        this._path = albumApiUrl;

        chai.should();
        chai.use(chaiHttp);

        this.startTests();
    }

    /**
     * Test Albums side
     */
    startTests() {
        describe ('Albums API', () => {
            describe ('/GET', () => {
                it('it sould GET all the albums', (done) => {
                    chai.request(this._app)
                    .get(this._path)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
                });
            });

            // TODO: Test POST to an existing Artist

            // TODO: Update

            // TODO: Delete
        });
    }
}