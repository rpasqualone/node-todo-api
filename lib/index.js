import express from 'express';
import http from 'http';
import cors from 'cors';
import 'express-status';
import { json } from 'body-parser';

import bookshelf from './connection';
import todo from './controllers/todo';

const app = express();

app.use(cors());
// Middleware to parse JSON Objects
app.use(json());
app.use('/todos', todo(bookshelf));

http.createServer(app).listen(3000, (err) => { if (err) throw err; });
