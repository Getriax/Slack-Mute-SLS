
class ResponseBuilder {
  constructor(callback, params = {}, status = 200) {
    this.callback = callback;
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

  exec() {
    if (this.status === 200) {
      const response = this.buildResponse();
      return this.callback(null, response);
    }

    return this.callback(this.message !== 'Ok' ? this.message : 'Internal error');
  }
}

module.exports = ResponseBuilder;
