import { Document, Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

export type UserRequest = {
	username: string
	password: string
}

export type UserResponse = {
	id: string
	username: string
	token: string
}

export interface UserDto extends Document {
	username: string
	createdAt: Date
	password: string
	encryptPassword(): Promise<string>
	validatePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema<UserDto>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, required: true },
})

UserSchema.methods.encryptPassword = async function (): Promise<string> {
	const salt = await bcryptjs.genSalt(10)
	return bcryptjs.hash(this.password, salt)
}

UserSchema.methods.validatePassword = async function (password) {
	return await bcryptjs.compare(password, this.password)
}

export default model<UserDto>('User', UserSchema)
