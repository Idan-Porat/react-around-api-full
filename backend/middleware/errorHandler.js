class ErrorHandler {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  error() {
    return `Error status: ${this.statusCode} and the reason is: ${this.message} `;
  }
}
module.exports = ErrorHandler;
