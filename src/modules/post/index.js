// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { postsController } from './controller.js'
import { postController } from './controller.js'
import { addPost } from './controller.js'
import { putPost } from './controller.js'
import { deletePost } from './controller.js'

// hadnling routes
router.route('/posts')
	.get( postsController )

router.route('/posts/:postId')
	.get( postController )

router.route('/posts')
	.post( addPost )
	.put( putPost )
	.delete( deletePost )

export default router