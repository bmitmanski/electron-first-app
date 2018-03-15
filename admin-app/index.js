const express = require("express");
var admin = require('firebase-admin');

var serviceAccount = require('./mitapp-1-firebase-key');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mitapp-1.firebaseio.com'
});

let app = express();



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