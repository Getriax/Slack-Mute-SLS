
class ResponseBuilder {
  constructor(params = {}, status = 200) {
    this.status = status;
    this.params = params;
    this.message = 'Ok';
  }

  addParams(params) {
    Object.assign(this.params, params);
  }

  removeParam(key) {
    if (this.params[key]) {
      delete this.params[key];
    }
  }

  setMessage(message) {
    this.message = message;
  }

  setStatus(status) {
    this.status = status;
  }

  buildResponse() {
    return {
      statusCode: this.status,
      body: JSON.stringify({
        message: this.message,
        ...this.params,
      }),
    };
  }

  exec(callback) {
    if (this.status === 200) {
      const response = this.buildResponse();
      return callback(null, response);
    }

    return callback(this.message !== 'Ok' ? this.message : 'Internal error');
  }
}

module.exports = ResponseBuilder;
