// errors/four-hundred-err.js
class FourHundredError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = FourHundredError;
