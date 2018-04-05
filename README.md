# thunder-client-js

The official JavaScript client library for the Thunder API.

## Usage

First, install the package with NPM:

```bash
$ npm install thunder-client
```

Then, require the package and use it to call API methods:

```js
const ThunderClient = require('thunder-client');

let thunder = new ThunderClient('http://thunder.sanctionco.com', 'application', 'secret');
thunder.getUser('sample@sanctionco.com', 'secure-password', (err, result) => {
  if (err) return console.log(err);

  console.log(result);
});
```

