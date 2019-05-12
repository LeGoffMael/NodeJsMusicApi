import Database from './src/database/database';

// Connect to MongoDB
const database = new Database('mongodb://localhost:27017/musicapi');

import app from './src/app';

// Set server on specified port
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Running NodeJSMusicApi app on port ${port}`)
});