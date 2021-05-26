const UserValidation = {
	lenght: (word: string, min: number, max: number, field: string) => {
		if (word.length < min) {
			return `${field} field, Too Short!`
		}
		if (word.length > max) {
			return `${field} field, Too Long!`
		}
		return false
	},
}

export default UserValidation
