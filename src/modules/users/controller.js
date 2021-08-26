import { users, user } from './model.js'
import JWT from '../../lib/jwt.js'
import { read, write } from '../../lib/orm.js'

const usersController = (req, res) => {
	try {
		res.status(200).json( users(req.query) )
	} catch (error) {
		console.log(error)
	}
}

const userController = (req, res) => {
	try {
		res.status(200).json( user(req.params) )
	} catch (error) {
		console.log(error)
	}
}

const putUser = (req, res) => {
	try{
		let { username, age, contact, gender } = req.body
		let users = read("users")
		const editUser = users.find(el => el.user_id == req.userId)
		if (editUser){
			if (username) editUser.username = username
			if (age) editUser.age = age
			if (contact) editUser.contact = contact
			if (gender) editUser.gender = gender
		}
		write("users", users)
		res.writeHead(201, {'Content-Type': 'application/json'})
		res.write(
			JSON.stringify({status: 201, message: 'user is edited!'})
		)
		return res.end()
	}catch (error) {
		res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({status: 500, message: error})
        );
        return res.end();
	}
}

export {
	usersController,
	userController,
	putUser,
}