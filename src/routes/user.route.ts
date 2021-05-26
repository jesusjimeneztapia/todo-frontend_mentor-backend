import { Router } from 'express'
import UserController from '../controllers/user.controller'
import ROUTES from '../helpers/routes'
import UserMiddleware from '../middlewares/user.middleware'

const UserRoute = Router()

UserRoute.post(
	ROUTES.USER,
	UserMiddleware.checkRequestBody,
	UserMiddleware.validationRequestBody,
	UserController.createUser,
	UserMiddleware.registerToken
)
UserRoute.post(
	ROUTES.USER_LOGIN,
	UserMiddleware.checkRequestBody,
	UserMiddleware.validationRequestBody,
	UserController.login,
	UserMiddleware.registerToken
)

export default UserRoute
