"use strict";

const request = require('request');
const _ = require('lodash');
const log = require('./log');

const Response = require('./Response');

const methods = [
  'get',
  'post',
  'put',
  'delete'
];

const bodyMethods = [
  'post',
  'put'
];

const getMethods = [
  'get',
  'head',
  'delete'
];

class Request {

  /**
   * Create a new request object
   * @param {string} url
   * @param {object} [options]
   */
  constructor(url, options) {
    if (!(this instanceof Request)) {
      return new Request();
    }

    this.isStream = false;
    this.url = url;
    this._options = options || {};

    bodyMethods.forEach(function(method) {
      this[method] = sendMethod.call(this, method, 'body');
    }.bind(this));

    getMethods.forEach(function(method) {
      this[method] = sendMethod.call(this, method, 'query');
    }.bind(this));

    function sendMethod(method, fn) {
      return function(obj, cb) {
        if ('function' === typeof obj) {
          cb = obj;
          obj = null;
        } else if ('object' === typeof obj) {
          this[fn](obj);
        }

        return this.method(method).send(cb);
      }.bind(this);
    }
  }

  /**
   * Set the URL of the request
   *
   * @param {String} url
   * @returns {Request}
   */
  url(url) {
    this.url = url;
    return this;
  }

  /**
   * Sends the request
   *
   * @param {function} [cb]
   *
   * @returns {Promise}
   */
  send(cb) {

    if (/^https/.test(this.url)) {
      this._options.strictSSL = _.isUndefined(this._options.strictSSL) ? false : this._options.strictSSL;
    }

    this._options.url = this.url;

    if (this.isStream) {
      return request(this._options);
    }

    let self = this;
    let p = sand.profiler && sand.profiler.enabled ? sand.profiler.profile(this._options.url) : null;
    return new Promise(function(resolve, reject) {
      request(self._options, function(err, res, body) {
        let response = new Response(body, res);

        if (err) {
          reject(err, res);
        } else {
          resolve(response, res);
        }

        if (typeof cb === 'function') {
          cb(err, res, response);
        }

        p && p.stop();
        return response;
      });
    })
  }

  /**
   * Call this to turn on streaming instead of Promise
   *
   * @returns {Request}
   */
  stream() {
    this.isStream = true;
    return this;
  }

  /**
   * Sets the method
   *
   * @param {string} method
   *
   * @returns {Request}
   */
  method(method) {
    this._options.method = method;
    return this;
  }

  /**
   * Sets options object. This overrides object
   * not merges with previous.
   *
   * @param {object} options
   *
   * @returns {Request}
   */
  options(options) {
    this._options = options;
    return this;
  }

  /**
   * The body object
   *
   * @param {string} body
   *
   * @returns {Request}
   */
  body(body) {
    this._options.body = body;
    return this;
  }

  /**
   * Set a single option.
   *
   * @param {string} name
   * @param {mixed} value
   *
   * @return {Request}
   */
  option(name, value) {
    this._options[name] = value;
    return this;
  }

  /**
   * Set form data.
   *
   * @param {object} data
   *
   * @return {Request}
   */
  formData(data) {
    this._options.formData = data;
    return this;
  }

  /**
   * The query string
   *
   * @param {string|object} name
   * @param {string} value
   *
   * @returns {Request}
   */
  query(name, value) {
    if ('object' === typeof name) {
      return this.qs(name);
    }

    if (!this._options.qs) {
      this._options.qs = {};
    }

    this._options.qs[name] = value;

    return this;
  }

  /**
   * The query string
   *
   * @param {string} query
   *
   * @returns {Request}
   */
  qs(query) {
    this._options.qs = query;
    return this;
  }

  /**
   * The headers
   *
   * @param {string} headers
   *
   * @returns {Request}
   */
  headers(headers) {
    this._options.headers = headers;
    return this;
  }

  /**
   * Add a header value to headers
   *
   * @param {String} name - the header name
   * @param {String} value - the header value
   */
  header(name, value) {
    if ('object' !== typeof this._options.headers) {
      this._options.headers = {};
    }

    this._options.headers[name] = value;
  }

  static newInstance(url, options) {
    return new this(url, options);
  }
}

module.exports = Request;

// Add Convenience functions for backwards compatibility
methods.forEach(function(method) {
  Request[method] = function(path, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    return new this(path, options).method(method).send(cb);
  }
});