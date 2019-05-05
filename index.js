// Const initialization
const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require('body-parser');
const app = Express();

// Import routes
let apiRoutes = require('./api-routes');

// support parsing of application/json type post data
app.use(BodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(BodyParser.urlencoded({ extended: true }));

// CORS definition
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Connect to mongoose
Mongoose.connect('mongodb://localhost:27017/musicapi', {useNewUrlParser: true, useFindAndModify: false}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

// Send message for default URL
app.get('/', (req, res) => res.send('NodeJsMusicApi home page'));

// Use Api routes in the App
app.use('/api/v1', apiRoutes);

// Set server on specified port
let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`))