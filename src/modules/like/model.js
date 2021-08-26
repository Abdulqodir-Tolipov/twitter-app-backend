import { read, write } from '../../lib/orm.js'

const likes = ({ userId }) => {
	let likes = read('like')
	if(userId) {
		return likes.filter( like => like.user_id == userId )
	} else {
		return likes
	}
}

const liking = (req) => {
	let posts = read('posts');
	let likes = read('like');
	let userId = req.userId;
	let { isLike, post_id: postId } = req.body;
	let post = posts.find(el =>  el.post_id == postId );
	if(!post) {
		return undefined
	}
	let like = likes.find(el =>  el.post_id == postId );
	if (!like) { 
		like = { post_id: postId, user_id: userId, isLike }
		likes.push(like)
	}	
	else if ( like.isLike == true && isLike == true) like.isLike = null
	else if ( like.isLike == null && isLike == true) like.isLike = true
	else if ( like.isLike == false && isLike == false) like.isLike = null
	else if ( like.isLike == null && isLike == false) like.isLike = false
	else if ( like.isLike == true && isLike == false) like.isLike = false
	else if ( like.isLike == false && isLike == true) like.isLike = true
	write( 'like', likes )
	return like
}




export default { 
	likes,
	liking,
}