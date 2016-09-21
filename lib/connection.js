import knex from 'knex';
import Bookshelf from 'bookshelf';
import 'pg';

// Replace with env variables
const connection = knex({
	client: 'pg',
	connection: 'postgres://postgres:postgres@localhost:5432/todo_app'
});

export default Bookshelf(connection);
