# thunder-client [JavaScript]
[![npm version](https://badge.fury.io/js/thunder-client.svg)](https://badge.fury.io/js/thunder-client)

The official JavaScript client library for the Thunder API.

See the docs [here](https://rohannagar.github.io/thunder-client-js/)

## Version Compatibility

- Thunder 2.1.0 -> v0.4.0 or higher
- Thunder 2.0.0 -> v0.3.0 or higher

## Usage

First, install the package with NPM:

```bash
$ npm install thunder-client
```

Then, require the package and use it to call API methods:

```js
const ThunderClient = require('thunder-client');

let thunder = new ThunderClient('http://thunder.sanctionco.com', 'application', 'secret');
thunder.getUser('sample@sanctionco.com', 'secure-password', (err, statusCode, result) => {
  if (err) return console.log(err);

  console.log(result);
});
```

