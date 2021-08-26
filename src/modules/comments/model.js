import { read, write } from '../../lib/orm.js'

const comments = ({ commentId }) => {
	// console.log(commentId);
	let allComments = read('comments')
	if(commentId) {
		return allComments.filter( comment => comment.comment_id == commentId )
	} else {
		return allComments
	}
}

const comment = ({ commentId }) => {
	// console.log(commentId);
	let allComments = read('comments')
	return allComments.find( comment => comment.comment_id == commentId )
}



export {
	comments,
	comment
}