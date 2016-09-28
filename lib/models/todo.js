import Ajv from 'ajv';
import todoSchema from '../schemas/todo.json';

const validate = new Ajv({
	allErrors: true,
	format: 'full',
	removeAdditional: 'all',
	useDefaults: true
}).compile(todoSchema);

export default (bookshelf) => {
	const BsModel = bookshelf.Model.extend({
		tableName: 'todos'
	});

	class Todo {
		static create(props) {
			if (validate(props)) {
				return new BsModel(props).save(null, null, null, {method: 'insert'});
			} else {
				return Promise.reject({message: validate.errors, status: 406});
			}
		}

		static getAll() {
			return BsModel.query('orderBy', 'id', 'asc').fetchAll();
		}

		static get(id) {
			return new BsModel({id}).fetch({require: true});
		}

		static update(id, props) {
			return new BsModel({id}).fetch({require: true}).then(todo => {
				todo = {...todo.toJSON(), ...props};
				if (validate(todo)) {
					return new BsModel({id}).save(todo, {patch: true});
				} else {
					return Promise.reject({message: validate.errors, status: 406});
				}
			});
		}

		static delete(id) {
			return new BsModel({id}).destroy({require: true});
		}
	}
	
	return Todo;
}
