import Album from '../../src/models/albumModel';
import Artist from '../../src/models/artistModel';

// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';

export default class AlbumTest {

    /**
     * @constructor
     * @param {*} app Running application
     * @param {*} albumApiUrl API URL to access to albums data
     */
    constructor(app, albumApiUrl, artist) {
        this._app = app;
        this._path = albumApiUrl;
        this._artist = artist;
        this._artistId = this._artist.save((err, artist) => {
            this._artistId = artist.id;
        });

        chai.should();
        chai.use(chaiHttp);
    }

    getAlbumContent() {
        return {
            title: "Scorpion",
            cover: "http://www.clique.tv/wp-content/uploads/2018/06/home-clique-tv-drake-scorpion.jpg",
            year: 2018,
            artist: this._artistId
        };
    }

    setAlbumContent(title, cover, year, artist) {
        return {
            title: (title ? title : this.getAlbumContent().title),
            cover: (cover ? cover : this.getAlbumContent().cover),
            year: (year ? year : this.getAlbumContent().year),
            artist: (artist ? artist : this.getAlbumContent().artist)
        };
    }

    /**
     * Test Albums side
     */
    startAllTests() {
        describe ('Albums API', () => {
            this.getAllTest();
            this.createTest();
            this.getByIdTest();
            this.updateTest();
            this.deleteTest();

            // TODO: Delete Album and check it is removed from Artist
            // TODO: Delete Artist and check his albums are deleted
            // TODO: test endpoints from artist /artists/:artist_id/albums/...
        });
    }

    getAllTest() {
        describe ('/GET', () => {
            it('it sould GET all the albums', (done) => {
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
            it('it should POST an album and add it to artist albums list', (done) => {
                chai.request(this._app)
                    .post(this._path)
                    .send(this.setAlbumContent(null, null, 2017, null))
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('title');
                        res.body.should.have.property('cover');
                        res.body.should.have.property('year');
                        res.body.should.have.property('artist');
                        res.body.artist.should.have.property('name');
                        res.body.artist.should.have.property('firstName');
                        res.body.artist.should.have.property('lastName');
                        res.body.should.have.property('createdAt');
                        res.body.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    }

    getByIdTest() {
        describe ('/GET/:album_id', () => {
            it('it should GET an album by the given id', (done) => {
                let album = new Album(this.setAlbumContent(null, null, 2017, null));
                album.save((err, album) => {
                    chai.request(this._app)
                        .get(this._path + '/' + album.id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(album.id);
                            res.body.should.have.property('title');
                            res.body.should.have.property('cover');
                            res.body.should.have.property('year');
                            res.body.should.have.property('artist');
                            res.body.artist.should.have.property('name');
                            res.body.artist.should.have.property('firstName');
                            res.body.artist.should.have.property('lastName');
                            res.body.should.have.property('createdAt');
                            res.body.should.have.property('updatedAt');
                            done();
                        });
                });
            });
        });
    }

    updateTest() {
        describe ('/PUT/:album_id', () => {
            it('it should UPDATE `year` attribute of an album by the given id', (done) => {
                let album = new Album(this.setAlbumContent(null, null, 2018, null));
                album.save((err, album) => {
                    chai.request(this._app)
                        .put(this._path + '/' + album.id)
                        .send(this.getAlbumContent())
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(album.id);
                            res.body.should.have.property('year').eql(2018);
                            res.body.should.have.property('artist');
                            res.body.artist.should.have.property('name');
                            res.body.artist.should.have.property('firstName');
                            res.body.artist.should.have.property('lastName');
                            done();
                        });
                });
            });
        });
    }

    deleteTest() {
        describe ('/DELETE/:album_id', () => {
            it('it should DELETE an album by the given id', (done) => {
                let album = new Album(this.getAlbumContent());
                album.save((err, artist) => {
                    chai.request(this._app)
                        .delete(this._path + '/' + album.id)
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