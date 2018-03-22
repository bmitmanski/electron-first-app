import React from 'react';
import * as firebase from "firebase";
import AddIntel from './AddIntel';
import Auth from './Auth';
import IntelList from './IntelList';
import {ipcRenderer} from 'electron';

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
    console.log('App constructor initapp');
    firebase.initializeApp(config);

    ipcRenderer.on('message', (event, message) => {
      console.log(event, message);
    })
  }

  render() {
    return (<div>
      <h2>Welcome to React! mate 1</h2>
      <p>Version: {this.props.version}</p>
      <Auth db={firebase}/>
      <AddIntel db={firebase}/>
      <IntelList db={firebase}/>
    </div>);
  }
}

export default App;
