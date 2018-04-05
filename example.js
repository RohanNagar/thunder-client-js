const ThunderClient = require('./thunder-client');

let thunder = new ThunderClient('http://localhost:8080', 'application', 'secret');

// Create a new user
thunder.createUser({
  email: { address: 'sample@sanctionco.com' },
  password: '12345',
}, (err, result) => {
  if (err) return console.log(err);

  console.log(result);

  // Get the user
  thunder.getUser('sample@sanctionco.com', '12345', (err, result) => {
    if (err) return console.log(err);

    console.log(result);

    // Delete the user
    thunder.deleteUser('sample@sanctionco.com', '12345', (err, result) => {
      if (err) return console.log(err);

      console.log(result);
    });
  });
});

