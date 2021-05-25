class ErrorModel {
	private message: String
	private title: String

	constructor(message: string, title: string) {
		this.message = message
		this.title = title
	}

	public getData() {
		return {
			message: this.message,
			title: this.title,
		}
	}
}

export default ErrorModel
