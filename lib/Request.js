"use strict";

const request = require('request');
const _ = require('lodash');
const log = require('./log');

class Request {

  send(url, options, cb) {
    if (_.isFunction(options)) {
      cb = options;
      options = {};
    }

    options = options || {};

    if (/^https/.test(url)) {
      options.strictSSL = _.isUndefined(options.strictSSL) ? false : options.strictSSL;
    }

    options.url = url;

    this.request = request(options, cb);
    return this;
  }

  static post(path, options, cb) {
    if (_.isFunction(options)) {
      cb = options;
      options = {};
    }

    options = options || {};
    options.method = 'post';

    return new this().send(path, options, cb);
  }

  static get(path, options, cb) {
    if (_.isFunction(options)) {
      cb = options;
      options = {};
    }

    options = options || {};
    options.method = 'get';
    return new this().send(path, options, cb);
  }
}

module.exports = Request;