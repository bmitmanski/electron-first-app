import React from 'react';
import * as firebase from "firebase";
import AddIntel from './AddIntel';
import IntelList from './IntelList';

class App extends React.Component {

  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyDVSWdb1vg2F4s5X2eFzMthX6l2hQU_1AI",
      authDomain: "mitapp-1.firebaseapp.com",
      databaseURL: "https://mitapp-1.firebaseio.com",
      projectId: "mitapp-1",
      storageBucket: "mitapp-1.appspot.com",
      messagingSenderId: "1092311482785"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (<div>
      <h2>Welcome to React! mate 1</h2>
      <AddIntel db={firebase}/>
      <IntelList db={firebase}/>
    </div>);
  }
}

export default App;
