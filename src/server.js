import express from 'express'
import { host, PORT } from './config.js'
const app = express()

app.listen( PORT,  () => {
	console.log('Server is running on http://' + host + ':' + PORT)
})