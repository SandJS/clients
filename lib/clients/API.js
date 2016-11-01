"use strict";

const Request = require('../Request');

const _ = require('lodash');

exports = module.exports = function(config) {
  class API extends Request {

    constructor(path, options) {
      options = _.defaults({}, options || {}, config.options);
      super(/^http/i.test(path) ? path : (config.baseURL + path), options);

      options.json = !_.isUndefined(options.json) ? options.json : true;
      if (_.isFunction(config.options)) {
        config.options(options);
      } else if (_.isPlainObject(config.options)) {
        _.merge(options, config.options);
      }

      super.options(options);

      let headers = _.defaults({}, options.headers || {}, (config.generateHeaders || _.noop)(config));

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
      if (!this._fields) {
        this._fields = {};
      }

      this._fields[name] = value;

      return this;
    }

    send() {
      this._mergeOptions();

      return super.send();
    }

    static newInstance(path, options = {}) {
      return new API(path, options);
    }
  }

  return API;
};