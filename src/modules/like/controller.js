import model from './model.js'

const likesController = (req, res) => {
	try {
		res.status(200).json( model.likes(req.query) )
	} catch (error) {
		console.log(error)
	}
}

const likController = (req, res) => {
	try {
		let like = model.liking(req);
		if(like) {
			res.status(201).json({
				status: 201,
				message: 'The like succesfully posted!',
			})
		} else throw 'Something went wrong!'
	} catch (error) {
		res.status(400).json({
			status: 400,
			message: 'Bad request!',
		})
	}
}


export {
	likesController,
	likController,
}