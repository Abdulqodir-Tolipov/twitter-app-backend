// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { likesController, likController } from './controller.js'

// hadnling routes
router.route('/like')
	.get( likesController )
    .post( likController )
		
export default router