"use strict";

const Request = require('../Request');

const $ = require('@whym/dollar');
const wutils = require('@whym/utils');
const Path = require('path');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = function(config) {
  class API extends Request {

    constructor(path, options) {
      super(/^http/i.test(path) ? path : ((config.protocol || 'http') + '://' + config.host + ':' + config.port + Path.normalize('/v1' + (/^\//.test(path) ? '' : '/') + path)));

      if (!(this instanceof API)) {
        return new API(path, options);
      }


      options = options || {};
      options.json = !_.isUndefined(options.json) ? options.json : true;
      super.options(options);

      var headers = _.defaults(options.headers || {}, generateHeaders());
      if (sand.context.authToken) {
        headers['x-auth-token'] = sand.context.authToken;
      }

      super.headers(headers);
    }

    _mergeOptions() {
      if (this._options.body || this._options.method === 'post') {
        this._options.body = _.merge(this._options.body, this._fields);
      } else {
        if (!this._options.qs) {
          this._options.qs = {};
        }

        this._options.qs = _.merge(this._options.qs, this._fields);
      }
    }

    limit(num) {
      return this.addField('limit', num);
    }

    page(page) {
      return this.addField('page', page);
    }

    order(order) {
      return this.addField('order', order);
    }

    addField(name, value) {
      this._fields[name] = value;
      return this;
    }

    setAuthToken(token) {
      this.header('x-auth-token', token);
    }

    static newInstance(authToken, path) {
      let options = {};

      if (arguments.length == 3) {
        options = arguments[2];
      }

      let instance = new API(path, options);
      instance.setAuthToken(authToken);

      return instance;
    }
  }

  return API;

  function generateHeaders(time) {
    time = time || moment().unix();
    var token = wutils.createToken(config.secret, [time, config.key]);

    return {
      'x-api-key': config.key,
      'x-api-time': time,
      'x-api-signature': token,
      'x-app-version': '1.3.0'
    }
  }
};