var firebase = require('firebase');
require("must/register");

describe('Firebase', () => {
  before(() => {
    var config = {
      apiKey: "AIzaSyDkuc-LEKvwFqUAUL9az7WhBe8gt0eYgIw",
      databaseURL: "ws://docker.firebaseio.com:5000"
    };
    /*var config = {
      apiKey: "AIzaSyDkuc-LEKvwFqUAUL9az7WhBe8gt0eYgIw",
      databaseURL: "ws://local.dealreporter.com:5000"
    };*/
    firebase.initializeApp(config);

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log('test.spec  connected');
      } else {
        console.log('test.spec not connected');
      }
    });
  });

  after(() => {
    firebase.database().goOffline();
  });

  it('reads data', (done) => {

    console.log('test.spec xxx ');
    // firebase.database().goOffline();

    firebase.database().ref('/').once('value').then(snapshot => {
      const expectedResult = {
        "intels": {
          "-L82a5Wt569OHMp8AG1j": {
            "content": "Wafello",
            "headline": "Wafello1"
          }
        }
      };

      console.log('test.spec sp snapshot', snapshot.val());

      snapshot.val().must.eql(expectedResult);
      console.log('test.spec koniec ');
      done();
    }).catch(e => console.log(e))
  });

});