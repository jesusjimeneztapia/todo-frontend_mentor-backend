import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ErrorModel from '../models/error.model'
import ResponseModel from '../models/response.model'
import UserService from '../services/user.service'

const UserController = {
	login: async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body

		const user = await UserService.findByUsername(username)

		if (!user) {
			res.status(StatusCodes.NOT_FOUND)
			let response: ResponseModel
			const errorModel = new ErrorModel(
				`User '${username}' doesn't exists`,
				ReasonPhrases.NOT_FOUND
			)
			response = {
				data: errorModel.getData(),
				date: new Date(),
				status: StatusCodes.NOT_FOUND,
			}
			return res.json(response)
		}

		const validPassword = await user.validatePassword(password)
		if (!validPassword) {
			res.status(StatusCodes.UNAUTHORIZED)
			let response: ResponseModel
			const errorModel = new ErrorModel(
				`Password is incorrect`,
				ReasonPhrases.UNAUTHORIZED
			)
			response = {
				data: errorModel.getData(),
				date: new Date(),
				status: StatusCodes.UNAUTHORIZED,
			}
			return res.json(response)
		}
		req.statusCode = StatusCodes.ACCEPTED
		req.body = {
			id: user._id,
			username,
		}
		next()
	},
	createUser: (req: Request, res: Response, next: NextFunction) => {
		const { password, username } = req.body
		UserService.addUser({ password, username })
			.then((user) => {
				req.body = {
					id: user._id,
					username,
				}
				return next()
			})
			.catch(() => {
				res.status(StatusCodes.CONFLICT)
				let response: ResponseModel
				const errorModel = new ErrorModel(
					`User '${username}' already exists`,
					ReasonPhrases.CONFLICT
				)
				response = {
					data: errorModel.getData(),
					date: new Date(),
					status: StatusCodes.CONFLICT,
				}
				return res.json(response)
			})
	},
}

export default UserController
