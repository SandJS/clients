exports = module.exports = {
  all: {
    clients: ['API'],
    API: {
      protocol: 'https',
      host: 'api.getwhym.com',
      port: 443,
      key: '73x7erlVhh637qPTH2V1Y7utvgX8n7yG9InA/xcjb4zQM228RzzqBFj93PMRmlG2',
      secret: '+qvOckzk9DiPVJGcUf6n0TWq5wY9qykcYUFlhUy9x2IjiYgDaGmj059qOOP0iHXN',
      version: '1.0'
    }
  },
  development: {
    API: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8001
    }
  },
  staging: {
    API: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8001
    }
  },
  //production: {
  //  API: {
  //    protocol: 'http',
  //    host: '127.0.0.1',
  //    port: 8001
  //  }
  //}
};