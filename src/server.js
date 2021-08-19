import express from 'express'
import { host, PORT } from './config.js'
const app = express()
import checkToken from './middlewares/checkToken.js'
import authModule from './modules/auth/index.js'
import postModule from './modules/post/index.js'

// third party global middlewares
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use( checkToken )

// loding modules
app.use( authModule )
app.use( postModule )

app.listen( PORT,  () => {
	console.log('Server is running on http://' + host + ':' + PORT)
})