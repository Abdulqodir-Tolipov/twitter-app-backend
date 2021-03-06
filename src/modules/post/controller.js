import { posts, post } from './model.js'
import JWT from '../../lib/jwt.js'
import { read, write } from '../../lib/orm.js'

const postsController = (req, res) => {
	try {
		// console.log(req.query)
		res.status(200).json( posts(req.query) )
	} catch (error) {
		console.log(error)
	}
}

const postController = (req, res) => {
	try {
		// console.log(req.params);
		res.status(200).json( post(req.params) )
	} catch (error) {
		console.log(error)
	}
}

const addPost = (req, res) => {
	try{ 
		if (!req.headers.token) throw "The token required!"
		let payload = JWT.verify(req.headers.token)
		let { post_title, post_body} = req.body
		let posts = read("posts")
		let newPost = {
			post_id: posts.length ? posts[posts.length-1].post_id + 1 : 1,
			post_title: post_title,
			post_body: post_body,
			post_created_at: new Date(),
			user_id: payload.userId
		}
		posts.push(newPost)
		write("posts", posts)
		res.writeHead(201, { 'Content-Type': 'application/json'})
		res.write(
			JSON.stringify({ status: 201, message: 'post is posted'})
		)
		return res.end()
	}catch (error) {
		res.writeHead(500, { 'Content-Type': 'application/json'})
		res.write(
			JSON.stringify( {status: 500, massage: error })
		)
		res.end()
	}

}


const putPost = (req, res) => {
	try{
		if (!req.headers.token) throw 'The token required'
		let payload = JWT.verify(req.headers.token)
		let { post_id, post_title, post_body } = req.body
		let posts = read("posts")
		const editPost = posts.find(el => el.user_id == payload.userId && el.post_id == post_id)
		if (editPost){
			if (post_title) editPost.post_title = post_title
			if (post_body) editPost.post_body = post_body
		}
		write("posts", posts)
		res.writeHead(201, {'Content-Type': 'application/json'})
		res.write(
			JSON.stringify({status: 201, message: 'post is update!'})
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




const deletePost = (req, res) => {
	try{
		if (!req.headers.token) throw 'The token required!'
		let payload = JWT.verify(req.headers.token)
		let { post_id } = req.body
		let posts = read("posts")
		let index = posts.findIndex(val => val.user_id == payload.userId && val.post_id == post_id)
		if (index > -1) {
			posts.splice(index, 1)
		}
		write("posts", posts)
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(
		  JSON.stringify({
			status: 204,
			message: "post deleted successfully"
		  })
		)
	  res.end();
	}catch (error){
		res.writeHead(500, {'Content-Type': 'application/json'})
		write(
			JSON.stringify( {status: 500, message: error} )
		)	
		return res.end()
	}

}

export {
	postsController,
	postController,
	addPost,
	putPost,
	deletePost
}