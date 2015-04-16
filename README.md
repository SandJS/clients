# INSTALL
```
npm install -S @whym/clients
```

# TEST / DEMO
```
npm test
```

# USAGE
```js
var clients = require('@whym/clients');

clients.API.post('/login', {}, function(err, resp, body) {
  console.log(err, body);
});
```