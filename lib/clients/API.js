"use strict";

const Request = require('../Request');

const $ = require('@whym/dollar');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = function(config) {
  class API extends Request {

    send(path, options, cb) {
      if (_.isFunction(options)) {
        cb = options;
        options = {};
      }

      var url = 'http://' + config.host + ':' + config.port + '/v1' + (/^\//.test(path) ? '' : '/') + path;


      options.json = !_.isUndefined(options.json) ? options.json : true;

      var headers = _.defaults(options.headers || {}, generateHeaders());
      if (process.domain && process.domain.authToken) {
        headers['x-auth-token'] = process.domain.authToken;
      }
      options.headers = headers;

      return super.send(url, options, cb);
    }

  }

  return API;

  function generateHeaders(time) {
    time = time || moment().unix();
    var token = $.createToken(config.secret, [time, config.key]);

    return {
      'x-api-key': config.key,
      'x-api-time': time,
      'x-api-signature': token
    }
  }
};