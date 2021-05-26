import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import config from '../config'
import ErrorModel from '../models/error.model'
import ResponseModel from '../models/response.model'
import { UserResponse } from '../models/user.model'
import UserValidation from '../utils/userValidation'

const UserMiddleware = {
	checkRequestBody: (
		{ body }: Request,
		res: Response,
		next: NextFunction
	) => {
		const { password, username } = body
		if (!password || !username) {
			res.status(StatusCodes.BAD_REQUEST)
			let response: ResponseModel
			const errorModel = new ErrorModel(
				"Request body required with the 'username' and 'password' properties",
				ReasonPhrases.BAD_REQUEST
			)
			response = {
				data: errorModel.getData(),
				date: new Date(),
				status: StatusCodes.BAD_REQUEST,
			}
			return res.json(response)
		}
		next()
	},
	validationRequestBody: (
		{ body }: Request,
		res: Response,
		next: NextFunction
	) => {
		const { password, username } = body
		let error = UserValidation.lenght(username, 3, 40, 'Username')
		error = error
			? error
			: UserValidation.lenght(password, 8, 64, 'Password')
		if (error) {
			res.status(StatusCodes.BAD_REQUEST)
			let response: ResponseModel
			const errorModel = new ErrorModel(error, ReasonPhrases.BAD_REQUEST)
			response = {
				data: errorModel.getData(),
				date: new Date(),
				status: StatusCodes.BAD_REQUEST,
			}
			return res.json(response)
		}
		next()
	},
	verifyToken: (req: Request, _: Response, next: NextFunction) => {
		const token = req.headers['x-access-token']?.toString()
		if (!token) {
			req.body = undefined
			req.statusCode = StatusCodes.UNAUTHORIZED
			req.statusMessage = 'No token provided'
			return next()
		}

		try {
			const decoded = jwt.verify(token, config.JWT_SECRET)
			req.body = decoded
		} catch ({ name, message }) {
			req.body = undefined
			req.statusCode = StatusCodes.NOT_ACCEPTABLE
			req.statusMessage = `${name}: ${message}`
		}
		next()
	},
	registerToken: ({ body, statusCode }: Request, res: Response) => {
		const { id, username } = body
		const token = jwt.sign({ id, username }, config.JWT_SECRET, {
			expiresIn: 60 * 60 * 24,
		})
		res.status(statusCode || StatusCodes.CREATED)
		let response: ResponseModel
		const userResponse: UserResponse = {
			id,
			username,
			token,
		}
		response = {
			data: userResponse,
			date: new Date(),
			status: statusCode || StatusCodes.CREATED,
		}
		res.json(response)
	},
}

export default UserMiddleware
