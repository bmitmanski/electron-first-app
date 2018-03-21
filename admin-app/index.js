const express = require("express");
var admin = require('firebase-admin');
const hazel = require('hazel-server')

var serviceAccount = require('./mitapp-1-firebase-key');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mitapp-1.firebaseio.com'
});

let app = express();

const hazelConfig = {
  repository: 'electron-first-app',
  account: 'bmitmanski',
  interval: 1
};

app.use('/mitapp', (req, res) => {
  hazel(hazelConfig)(req, res)
});

app.use('/token/:uid', (req, res) => {
  const uid = req.params.uid;
  admin.auth().createCustomToken(uid)
    .then(function(customToken) {
      res.send(customToken);
      // Send token back to client
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
    });
});

app.use('/', (req, res) => {
  res.send('bumcyk');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));