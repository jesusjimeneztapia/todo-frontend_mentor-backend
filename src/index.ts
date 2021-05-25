import SERVER from './server'
import './database'
import config from './config'

SERVER.listen(config.PORT, () => {
	console.log(`Server listening on port ${config.PORT}`)
})
