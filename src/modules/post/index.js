// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { postsController } from './controller.js'
import { postController } from './controller.js'

// hadnling routes
router.route('/posts')
	.get( postsController )

router.route('/posts/:postId')
	.get( postController )

export default router