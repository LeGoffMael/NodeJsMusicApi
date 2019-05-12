import mongoose from 'mongoose';

export default class Database {

    /**
     * Initialize database and connection
     * @constructor
     * @param {String} uri database connection name
     */
    constructor(uri) {
        this.connect(uri);
    }

    /**
     * Connect to the database
     * @param {String} uri database connection name
     */
    connect(uri) {
        mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false });

        mongoose.connection.on('connected', () => {
            console.log('Connected to mongoDB : ' + uri);
        });

        mongoose.connection.on('error', (err) => {
            console.log('Database Connection Failed' + err);
        });

        mongoose.connection.on('disconnected', (err) => {
            console.log('Database Connection Failed' + err);
        });
    }

    /**
     * Close MongoDb disconnection
     */
    async close() {
        console.log('Disconnected to mongoDB');
        mongoose.disconnect();
    }
}