import { read, write } from '../../lib/orm.js'

const users = ({ userId }) => {
	let users = read('users')
	if(userId) {
		return users.filter( user => user.user_id == userId )
	} else {
		for (let i of users) {
			delete i.password
		}
		 return users
	}
}

const user = ({ userId }) => {
	let users = read('users')
	return users.find( user => user.user_id == userId )
}

export {
	users,
	user
}