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
    }

    getArtistContent() {
        return {
            name: "Drake",
            firstName: "Aubrey Drake",
            lastName: "Graham"
        };
    }

    setArtistContent(name, firstName, lastName) {
        return {
            name: (name ? name : this.getArtistContent().name),
            firstName: (firstName ? firstName : this.getArtistContent().firstName),
            lastName: (lastName ? lastName : this.getArtistContent().lastName)
        };
    }


    /**
     * Test Artist side
     */
    startAllTests() {
        describe ('Artists API', () => {
            this.getAllTest();
            this.createTest();
            this.getByIdTest();
            this.updateTest();
            this.deleteTest();
        });
    }

    getAllTest() {
        describe ('/GET', () => {
            it('it should GET all the artists', (done) => {
                chai.request(this._app)
                    .get(this._path)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    }

    createTest() {
        describe ('/POST', () => {
            it('it should POST an artist', (done) => {
                chai.request(this._app)
                    .post(this._path)
                    .send(this.setArtistContent(null, "Drake", null))
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
    }

    getByIdTest() {
        describe ('/GET/:artist_id', () => {
            it('it should GET an artist by the given id', (done) => {
                let artist = new Artist(this.setArtistContent(null, "Drake", null));
                artist.save((err, artist) => {
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
    }

    updateTest() {
        describe ('/PUT/:artist_id', () => {
            it('it should UPDATE `firstName` attribute of an artist by the given id', (done) => {
                let artist = new Artist(this.setArtistContent(null, "Drake", null));
                artist.save((err, artist) => {
                    chai.request(this._app)
                        .put(this._path + '/' + artist.id)
                        .send(this.getArtistContent())
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
    }

    deleteTest() {
        describe ('/DELETE/:artist_id', () => {
            it('it should DELETE an artist by the given id', (done) => {
                let artist = new Artist(this.getArtistContent());
                artist.save((err, artist) => {
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
    }
}