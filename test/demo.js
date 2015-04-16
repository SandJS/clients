/**
 * @author Adam Jaso <ajaso@pocketly.com>
 * @copyright 2015 Pocketly
 */ 

var async = require('async');
var clients = require('..');


async.parallel({
  API: function(done) {
    clients.API.post('/login', {}, function(err, resp, body) {
      done(null, err, body);
    });
  }
}, function(err, result) {

  if (err) {
    return console.log(err.message, err);
  }

  console.log(JSON.stringify(result, null, 2));

});