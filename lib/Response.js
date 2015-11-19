"use strict";

const _ = require('lodash');

class Response {
  constructor(body, response) {
      _.each(body, function(value, key) {
        this[key] = value;
      }, this);

    Object.defineProperty(this, '__response', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: response
    });
  }

  getResponse() {
    return this.__response;
  }
}

module.exports = Response;