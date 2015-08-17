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
      if (process.domain && process.domain.authToken) {
        headers['x-auth-token'] = process.domain.authToken;
      }

      super.headers(headers);
    }
  }

  return API;

  function generateHeaders(time) {
    time = time || moment().unix();
    var token = wutils.createToken(config.secret, [time, config.key]);

    return {
      'x-api-key': config.key,
      'x-api-time': time,
      'x-api-signature': token
    }
  }
};