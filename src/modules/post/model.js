import { read, write } from '../../lib/orm.js'

const twittPost = read("posts")
const twittUser = read("users")
const twittComment = read("comments")

const posts = ({ postId }) => {
	let posts = read('posts')
	if(postId) {
		return posts.filter( post => post.post_id == postId )
	} else {
		for (let i of twittUser){
		delete i.password	
		}	
		twittPost.map(post => {
			post.user = twittUser.filter( user => user.user_id == post.user_id)
		})
		twittPost.map(post => {
			post.comments = twittComment.filter( comment => comment.post_id == post.post_id)
		})

		return twittPost
	}
}

const post = ({ postId }) => {
	let posts = read('posts')
	return posts.find( post => post.post_id == postId )
}


export {
	posts,
	post
}