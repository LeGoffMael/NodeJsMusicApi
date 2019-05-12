import mongoose from 'mongoose';
import Artist from '../../src/models/artistModel';
// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';

export default class ArtistTest {

    /**
     * @constructor
     * @param {*} app Running application
     * @param {*} artistApiUrl API URL to access to artists data
     */
    constructor(app, artistApiUrl) {
        this._app = app;
        this._path = artistApiUrl;

        chai.should();
        chai.use(chaiHttp);

        this.startTests();
    }

    /**
     * Test Artist side
     */
    startTests() {
        describe ('Artists API', () => {
            describe ('/GET', () => {
                it('it sould GET all the artists', (done) => {
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

            describe ('/POST', () => {
                it('it should POST an artist', (done) => {
                    let artist = {
                        name: "Drake",
                        firstName: "Aubrey Drake",
                        lastName: "Graham"
                    }
                    chai.request(this._app)
                    .post(this._path)
                    .send(artist)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('firstName');
                        res.body.should.have.property('lastName');
                        res.body.should.have.property('createdAt');
                        res.body.should.have.property('updatedAt');
                        done();
                    });
            });
            });

            describe ('/GET/:artist_id', () => {
                it('it sould GET an artist by the given id', (done) => {
                    let artist = new Artist({ name: "Drake", firstName: "Drake", lastName: "Graham" });
                    artist.save((err, book) => {
                        chai.request(this._app)
                        .get(this._path + '/' + artist.id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(artist.id);
                            res.body.should.have.property('name');
                            res.body.should.have.property('firstName');
                            res.body.should.have.property('lastName');
                            res.body.should.have.property('albums');
                            res.body.should.have.property('createdAt');
                            res.body.should.have.property('updatedAt');
                            done();
                        });
                    });
                });
            });

            describe ('/PUT/:artist_id', () => {
                it('it sould UPDATE an artist by the given id', (done) => {
                    let artist = new Artist({ name: "Drake", firstName: "Drake", lastName: "Graham" });
                    artist.save((err, book) => {
                        chai.request(this._app)
                        .put(this._path + '/' + artist.id)
                        .send({ name: "Drake", firstName: "Aubrey Drake", lastName: "Graham" })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(artist.id);
                            res.body.should.have.property('firstName').eql('Aubrey Drake');
                            done();
                        });
                    });
                });
            });

            describe ('/DELETE/:artist_id', () => {
                it('it sould DELETE an artist by the given id', (done) => {
                    let artist = new Artist({ name: "Drake", firstName: "Aubrey Drake", lastName: "Graham" });
                    artist.save((err, book) => {
                        chai.request(this._app)
                        .delete(this._path + '/' + artist.id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('success').eql(true);
                            done();
                        });
                    });
                });
            });
        });
    }
}