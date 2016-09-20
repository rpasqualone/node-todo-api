class Todo {
	static create(props) {
		const id = ++Todo._counter;
		const todo = {...props, id};
		Todo._todos.push(todo);
		Todo._todosById[id] = todo;
		return Promise.resolve(todo);
	}
	
	static getAll() {
		return Promise.resolve(Todo._todos);
	}
	
	static get(id) {
		const todo = Todo._todosById[id];

		if (todo) {
			return Promise.resolve(todo);
		} else {
			return Promise.reject({status: 404, message: 'Resource not found'});
		}
	}

	static update(id, props) {
		const todo = Todo._todosById[id];

		if (todo) {
			return Promise.resolve(Object.assign(todo, props));
		} else {
			return Promise.reject({status: 404, message: 'Resource not found'});
		}
	}
	
	static delete(id) {
		const todo = Todo._todosById[id];
		const index = Todo._todos.indexOf(todo);

		if (index > -1) {
			Todo._todos.splice(index, 1);
			delete Todo._todosById[id];
			return Promise.resolve(null);
		} else {
			return Promise.reject({status: 404, message: 'Resource not found'});
		}
	}
}

Todo._counter = 0;
Todo._todos = [];
Todo._todosById = {};

export default Todo;
