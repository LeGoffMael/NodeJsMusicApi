import ApiTest from './testsControllers/apiTest';
import DatabaseTest from './databaseTest'

// Set testing database to not modify real data
const dbTest = new DatabaseTest('mongodb://localhost:27017/musicapi');

before(() => {
    dbTest.start();
});

import app from '../src/app';

// Set server on specified port
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Test application running on port ${port}`)
});

const apiTest = new ApiTest(app);

// Close testing database
after(() => {
    dbTest.stop();
});