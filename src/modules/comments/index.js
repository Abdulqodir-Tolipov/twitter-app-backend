// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { commentsController } from './controller.js'
import { commentController } from './controller.js'
import { addComment } from './controller.js'
import { putComment } from './controller.js'
import { deleteComment } from './controller.js'

// hadnling routes
router.route('/comments')
	.get( commentsController )

router.route('/comments/:commentId')
	.get( commentController )

router.route('/comments')
	.post( addComment )
	.put( putComment )
	.delete( deleteComment )

export default router