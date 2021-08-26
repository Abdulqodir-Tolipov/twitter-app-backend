import { comments, comment} from './model.js'
import JWT from '../../lib/jwt.js'
import { read, write } from '../../lib/orm.js'

const commentsController = (req, res) => {
	try {
		res.status(200).json( comments(req.query) )
	} catch (error) {
		console.log(error)
	}
}

const commentController = (req, res) => {
	try {
		// console.log(req.params);
		res.status(200).json( comment(req.params) )
	} catch (error) {
		console.log(error)
	}
}

const addComment = (req, res) => {
	try{ 
		if (!req.headers.token) throw "The token required!"
		let payload = JWT.verify(req.headers.token)
		let { comment_body, post_id} = req.body
		let comments = read("comments")
		let newComment = {
			comment_id: comments.length ? comments[comments.length-1].comment_id + 1 : 1,
			comment_body: comment_body,
			comment_created_at: new Date(),
			user_id: payload.userId,
			post_id: post_id
		}
		comments.push(newComment)
		if(write("comments", comments)){
		res.writeHead(201, { 'Content-Type': 'application/json'})
		res.write(
			JSON.stringify({ status: 201, message: 'comment is writed'})
		)
		return res.end()
		}
	}catch (error) {
		res.writeHead(500, { 'Content-Type': 'application/json'})
		res.write(
			JSON.stringify( {status: 500, massage: error })
		)
		res.end()
	}

}


const putComment = (req, res) => {
	try{
		if (!req.headers.token) throw 'The token required'
		let payload = JWT.verify(req.headers.token)
		let { comment_id, comment_body } = req.body
		// console.log(req.body);
		let comments = read("comments")
		// console.log(comments);
		const editComment = comments.find(el => el.user_id == payload.userId && el.comment_id == comment_id)
		console.log(editComment);
		if (editComment){
			if (comment_body) editComment.comment_body = comment_body
		}
		write("comments", comments) 
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




const deleteComment = (req, res) => {
	try{
		if (!req.headers.token) throw 'The token required!'
		let payload = JWT.verify(req.headers.token)
		let { comment_id } = req.body
		let comments = read("comments")
		console.log(comments);
		let index = comments.findIndex(val => val.user_id == payload.userId && val.comment_id == comment_id)
		if (index > -1) {
			comments.splice(index, 1)
		}
		write("comments", comments)
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
	commentsController,
	commentController,
	addComment,
	putComment,
	deleteComment
}