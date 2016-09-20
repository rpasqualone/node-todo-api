import Todo from '../models/todo.js';
import { Router } from 'express';
import 'express-status';

const router = Router();

router.post('/', (req, res) => {
	Todo.create(req.body).then((todo) => {
		res.json(todo);
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
		res.notFound().send(err);
	});
});

router.patch('/:id', (req, res) => {
	Todo.update(req.params.id, req.body).then((todo) => {
		res.set({'Content-Length': '123'}).json(todo);
	}).catch((err) => {
		res.notFound().send(err);
	});
});

router.delete('/:id', (req, res) => {
	Todo.delete(req.params.id).then((todo) => {
		res.json(todo);
	}).catch((err) => {
		res.notFound().send(err);
	});
});

export default router;
