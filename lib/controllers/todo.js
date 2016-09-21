import TodoFactoru from '../models/todo.js';
import { Router } from 'express';
import 'express-status';

export default (bookshelf) => {
	const Todo = TodoFactoru(bookshelf);
	const router = Router();

	router.post('/', (req, res) => {
		Todo.create(req.body).then((todo) => {
			// may want to return absolute URL to newly created resource
			res.json(todo);
		}).catch((err) => {
			return res.status(err.status).send(err);
		});
	});

	router.get('/', (req, res) => {
		Todo.getAll().then((todos) => {
			res.json(todos);
		});
	});

	router.get('/:id', (req, res) => {
		Todo.get(req.params.id).then((todo) => {
			res.json(todo);
		}).catch((err) => {
			err.status = 404;
			return res.status(err.status).send(err);
		});
	});

	router.patch('/:id', (req, res) => {
		Todo.update(req.params.id, req.body).then((todo) => {
			res.json(todo);
		}).catch((err) => {
			err.status = 404;
			return res.status(err.status).send(err);
		});
	});

	router.delete('/:id', (req, res) => {
		Todo.delete(req.params.id).then((todo) => {
			res.json(todo);
		}).catch((err) => {
			err.status = 404;
			return res.status(err.status).send(err);
		});
	});

	return router;
}
