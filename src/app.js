import express from 'express';
import bodyParser from 'body-parser';
// Import routes
import ApiRouter from './routes/apiRouter';

const app = express();
const apiRouter = new ApiRouter();

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Send message for default URL
app.get('/', (req, res) => res.send('NodeJsMusicApi home page'));

// Use Api routes in the App
app.use('/api/v1', apiRouter.get());

export default app;