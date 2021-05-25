import mongoose from 'mongoose'
import config from './config'

if (config.MONGODB_URI === '') {
	throw new Error('Set MONGODB_URI as an enviroment variable')
}

mongoose
	.connect(config.MONGODB_URI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) => {
		console.log('Mongodb is connected to', db.connection.host)
	})
	.catch((error) => {
		console.error(error)
	})
