import express from 'express';
import http from 'http';
import 'express-status';
import { json } from 'body-parser';
import todo from './controllers/todo';

const app = express();
// Middleware to parse JSON Objects
app.use(json());
app.use('/todos', todo);

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/', (req, res) => {
	res.ok().send('Matt');
});

http.createServer(app).listen(3000, (err) => { if (err) throw err; });
