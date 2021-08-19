import model from './model.js'
import JWT from '../../lib/jwt.js'

const postsController = (req, res) => {
	try {
		res.status(200).json( model.posts(req.query) )
	} catch (error) {
		console.log(error)
	}
}

const postController = (req, res) => {
	try {
		res.status(200).json( model.post(req.params) )
	} catch (error) {
		console.log(error)
	}
}


export {
	postsController,
	postController
}