"use strict";

const request = require('request');
const _ = require('lodash');
const log = require('./log');

const methods = [
  'get',
  'post',
  'put',
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

    this.url = url;
    this.options = options || {};

    methods.forEach(function(method) {
      this[method] = function() {
        return this.method(method).send();
      }.bind(this);
    }.bind(this));
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
      this.options.strictSSL = _.isUndefined(options.strictSSL) ? false : options.strictSSL;
    }

    this. options.url = this.url;

    let self = this;
    return new Promise(function(resolve, reject) {
      request(self.options, function(err, res, body) {
        if (err) {
          reject(err, res);
        } else {
          resolve(body, res);
        }

        if (typeof cb === 'function') {
          cb(err, res, body);
        }

        return body;
      });
    })
  }

  /**
   * Sets the method
   *
   * @param {string} method
   *
   * @returns {Request}
   */
  method(method) {
    this.options.method = method;
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
    this.options = options;
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
    this.options.body = body;
    return this;
  }

  /**
   * The query string
   *
   * @param {string} query
   *
   * @returns {Request}
   */
  query(query) {
    this.options.qs = query;
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
    return this.query(query);
  }

  /**
   * The headers
   *
   * @param {string} headers
   *
   * @returns {Request}
   */
  headers(headers) {
    this.options.headers = headers;
    return this;
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