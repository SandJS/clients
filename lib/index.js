/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2015 Pocketly
 */

"use strict";

const SandGrain = require('sand-grain');

class Clients extends SandGrain {
  constructor() {
    super();
    this.name = this.configName = 'clients';
    this.defaultConfig = require('./defaultConfig');
    this.version = require('../package').version;
  }

  *init(config) {
    super.init(config);

    for (let client in this.config.clients) {
      if (!this.config.clients.hasOwnProperty(client)) {
        continue;
      }

      this[client] = require(`./clients/API`)(this.config.clients[client]);
    }
  }
}

module.exports = Clients;