'use strict';

const $ = require('@whym/dollar');
const async = require('async');
const GlobalResponseHelper = require('../GlobalResponseHelper');

exports = module.exports = function(config) {
  const API = sand.clients.API;
  class GlobalAPI extends API {
    constructor(path, options) {
      super(path, options);

      this.path = path;

      this._returnMethod = GlobalResponseHelper.concatResults;
      this._returnKey = '';
      this._returnOrder = '';
    }

    sortByKey(key, order) {
      order = order || 'asc';

      this._returnMethod = GlobalResponseHelper.sortByKey;
      this._returnKey = key;
      this._returnOrder = order;

      return this;
    }

    sortByCreatedTime(order) {
      return this.sortByKey('createdTime', order || 'desc');
    }

    sortByRegion(region) {
      this._returnMethod = GlobalResponseHelper.sortByRegion;
      this._returnKey = key;

      return this;
    }

    send() {
      this._mergeOptions();

      let res = {};

      let errorsCount = 0;
      let lastErrorCode = null;
      let lastErrorMessage = null;

      let path = this.path;
      let _options = this._options

      return new Promise((resolve, reject) => {
        async.forEachOf(config.hosts, (host, key, callback) => {
          return new co(function *() {
            let options = _.clone(_options);
            let url = (config.protocol || 'https') + '://' + host + path;
            let request = new API(url, options);
            let response = yield request.send();
            if (response.getResponse().statusCode >= 200 && response.getResponse().statusCode <= 204) {
              res[key] = response.valueOf();
            } else {
              errorsCount++;
              lastErrorCode = response.getResponse().statusCode;
              lastErrorMessage = response.valueOf();
            }

            callback();
          }).catch((e) => {
            sand.error(e);
            reject(e);
          });
        }, () => {
          if (errorsCount == config.hosts.length) {
            let error = new HttpError(lastErrorCode, lastErrorMessage);
            return reject(error);
          }

          resolve(this._returnMethod(res, this._returnKey, this._returnOrder));
        });
      });
    }

    static newInstance(authToken, path) {
      let options = {};

      if (arguments.length == 3) {
        options = arguments[2];
      }

      let instance = new GlobalAPI(path, options);
      instance.setAuthToken(authToken);

      return instance;
    }
  }

  return GlobalAPI;
}