/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2015 Pocketly
 */

"use strict";

var async = require('async');
var URL = require('url');
var _ = require('lodash');
var $ = require('@whym/dollar');

module.exports = exports = (function() {
  let exports = {};
  let config = exports.config = $.mergeConfig(require('./defaultConfig'));

  var clients = require('require-all')({
    dirname: __dirname + '/clients',
    filter: /([A-Z].*)\.js$/
  });

  _.each(clients, function(Client, name) {
    exports[name] = Client(config[name]);
  });

  return exports;
})();

exports.Request = require('./Request');

exports.spdyConfig = function(host, port) {
  if (/^http/.test(host)) {
    var parts = URL.parse(host);
    host = parts.hostname;
    port = parts.port || 443;
  }

  return {
    agentOptions: {
      host: host,
      port: port,

      // Optional SPDY options
      spdy: {
        plain: true,
        ssl: true,
        version: 3 // Force SPDY version
      }
    },
    strictSSL: false,
    agentClass: spdy.createAgent
  };
};