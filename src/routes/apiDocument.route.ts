import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../todoapi.json'

const ApiDocumentRoute = Router()

ApiDocumentRoute.use('/', swaggerUi.serve)
ApiDocumentRoute.get('/', swaggerUi.setup(swaggerDocument))

export default ApiDocumentRoute
