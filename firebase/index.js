const FirebaseServer = require('firebase-server');

new FirebaseServer(5000, 'docker.firebaseio.com', {
  /* You can put your initial data model here, or just leave it empty */
});
