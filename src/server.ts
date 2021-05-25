import express from 'express'
import ROUTES from './helpers/routes'
import ApiDocumentRoute from './routes/apiDocument.route'
import UserRoute from './routes/user.route'

const app = express()

app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(ROUTES.API, ApiDocumentRoute)
app.use(ROUTES.API, UserRoute)

export default app
