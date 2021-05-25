import { config } from 'dotenv'
config()

const configurations = {
	PORT: process.env.PORT || 8080,
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	MONGODB_URI: process.env.MONGODB_URI || '',
}

export default configurations
