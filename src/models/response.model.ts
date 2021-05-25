import { StatusCodes } from 'http-status-codes'

interface ResponseModel {
	data: any
	date: Date
	status: StatusCodes
}

export default ResponseModel
