import express from 'express'
import cors from 'cors'
import ROUTES from './helpers/routes'
import ApiDocumentRoute from './routes/apiDocument.route'
import UserRoute from './routes/user.route'
import config from './config'

const app = express()

app.use(
	cors({
		origin: config.CORS_ORIGIN,
	})
)
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(ROUTES.API, ApiDocumentRoute)
app.use(ROUTES.API, UserRoute)

export default app
