import { read, write } from '../../lib/orm.js'

const posts = ({ userId }) => {
	let posts = read('posts')
	if(userId) {
		return posts.filter( post => post.user_id == userId )
	} else {
		return posts
	}
}

const post = ({ postId }) => {
	let posts = read('posts')
	return posts.find( post => post.post_id == postId )
}

export default {
	posts,
	post
}