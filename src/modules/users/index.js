// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { usersController } from './controller.js'
import { userController } from './controller.js'
import { putUser } from './controller.js'

// hadnling routes
router.route('/users')
	.get( usersController )

router.route('/users/:userId')
	.get( userController )

router.route('/users')
	.put( putUser )

export default router