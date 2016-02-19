/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2015 Pocketly
 */

"use strict";

const SandGrain = require('sand-grain');
const $ = require('@whym/dollar');

class Clients extends SandGrain {
  constructor() {
    super();
    this.name = this.configName = 'clients';
    this.defaultConfig = $.mergeConfig(require('./defaultConfig'));
    this.version = require('../package').version;
  }

  *init(config) {
    super.init(config);

    for (let client of this.config.clients) {
      this[client] = require(`./clients/${client}`)(this.config[client]);
    }
  }
}

module.exports = Clients;