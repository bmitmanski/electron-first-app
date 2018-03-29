const FirebaseServer = require('firebase-server');

const server = new FirebaseServer(5000, 'docker.firebaseio.com', {
  intels: {
    '-L82a5Wt569OHMp8AG1j': {
      content: 'Wafello',
      headline: 'Wafello1'
    }
  }
  /* You can put your initial data model here, or just leave it empty */
});

//
// server.setRules(
//   {
//     "rules": {
//       ".read": true,
//       ".write": "auth.uid != null"
//     }
//   }
// );

// const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMTIiLCJpYXQiOjE1MjIyMzk0OTUsImV4cCI6MTUyMjI0MzA5NSwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0xcWtmdkBtaXRhcHAtMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTFxa2Z2QG1pdGFwcC0xLmlhbS5nc2VydmljZWFjY291bnQuY29tIn0.kBh3ie53EA-wcJfGVFVcDo5XUT-b4QK2m__B5cqdoIYbWZjYTCR_sYp7gX0f-MAs2sDiNJy_mFcipW35dfyI5c_uKuY_9n-0n6w_1cCqAKGdD54As6Re4GpxvhlQMo-N7skyTnBkxvG0AuweakPwqhz0G6Zeg5AvaQf_FwQDhla0lAObyGsltaktHeM9MMHnuDpAGgX4ZI8D43KG2VGhZiadGYLpggx55i3Pu7FXx7WDmRde7u0ltwz5NA_e0OBmEUrPTnpGzNQg97bLKPROfLoUkqDbfLTk6-ebUEj3kdX4J3CwwJo4LFMp_jVJkgEzWf0gD6JuemWfNGOBLLw6mQ';


// server.setAuthSecret(token);