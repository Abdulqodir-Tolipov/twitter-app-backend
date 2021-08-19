import express from 'express'
import { host, PORT } from './config.js'
const app = express()
import authModule from './modules/auth/index.js'

// third party global middlewares
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

// loding modules
app.use( authModule )

app.listen( PORT,  () => {
	console.log('Server is running on http://' + host + ':' + PORT)
})