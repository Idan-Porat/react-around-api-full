class errorHandler {
  constructor(message, statusCode) {
    this.message = message
    this.statusCode = statusCode;
  }
}

module.exports = errorHandler;