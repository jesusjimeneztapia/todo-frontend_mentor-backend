import User, { UserDto, UserRequest } from '../models/user.model'

const UserService = {
	addUser: async (user: UserRequest): Promise<UserDto> => {
		const userDto = new User({
			username: user.username,
			password: user.password,
			createdAt: new Date(),
		})
		userDto.password = await userDto.encryptPassword()
		await userDto.save()
		return userDto
	},
	findByID: async (id: string): Promise<UserDto | null> => {
		const user = await User.findById(id)
		return user
	},
	findByUsername: async (username: string): Promise<UserDto | null> => {
		const user = await User.findOne({ username })
		return user
	},
}

export default UserService
