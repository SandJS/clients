exports = module.exports = {
  all: {
    clients: ['API', 'GlobalAPI'],
    API: {
      protocol: 'https',
      host: 'api.getwhym.com',
      port: 443,
      key: '73x7erlVhh637qPTH2V1Y7utvgX8n7yG9InA/xcjb4zQM228RzzqBFj93PMRmlG2',
      secret: '+qvOckzk9DiPVJGcUf6n0TWq5wY9qykcYUFlhUy9x2IjiYgDaGmj059qOOP0iHXN',
      version: '1.0',
      pathPrefix: '',
      options: {}
    },
    GlobalAPI: {
      protocol: 'https',
      hosts: {
        "eu": "eu.api.getwhym.com",
        "us": "us.api.getwhym.com",
        "as": "as.api.getwhym.com"
      }
    }
  },
  development: {
    API: {
      host: 'api.local.getwhym.com'
    },

    GlobalAPI: {
      hosts: {
        "eu": "eu.api.local.getwhym.com",
        "us": "us.api.local.getwhym.com",
        "as": "as.api.local.getwhym.com"
      }
    }
  },
  staging: {
    API: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8001
    },

    GlobalAPI: {
      hosts: {
        "eu": "eu.api.staging.getwhym.com",
        "us": "us.api.staging.getwhym.com",
        "as": "as.api.staging.getwhym.com"
      }
    }
  }
};