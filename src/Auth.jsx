import React from 'react';
import rp from 'request-promise';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    var user = this.props.db.auth().currentUser;

    this.state = {
      user
    };

    // this.db = this.props.db.database().ref('intels');
    console.log('Auth constructor');

    this.props.db.auth().onAuthStateChanged(user => {
      console.log('Auth onAuthStateChanged user ', user);
      this.setState({
        user
      });
      // if (user) {
      //   // User is signed in.
      // } else {
      //   // No user is signed in.
      // }
    });


    this.auth = this.auth.bind(this);
  }

  async auth() {
    const uid = 111;

    // rp('http://localhost:3000/token/' + uid)
    //   .then(token => {
    //     console.log('Auth toke token', token);
    //     this.props.db.auth().signInWithCustomToken(token)
    //       .then(() => console.log('Authenticated'))
    //       .catch(error => {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ...
    //       console.log('Auth  error  ', errorCode, errorMessage);
    //     });
    //   })
    //   .catch(error => console.error(error))

    //async / await
    try {
      // const token = await rp('http://localhost:3000/token/' + uid);
      // console.log('Auth auth toekn', token);
      // await this.props.db.auth().signInWithCustomToken(token)

      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMTIiLCJpYXQiOjE1MjIyMzk0OTUsImV4cCI6MTUyMjI0MzA5NSwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0xcWtmdkBtaXRhcHAtMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTFxa2Z2QG1pdGFwcC0xLmlhbS5nc2VydmljZWFjY291bnQuY29tIn0.kBh3ie53EA-wcJfGVFVcDo5XUT-b4QK2m__B5cqdoIYbWZjYTCR_sYp7gX0f-MAs2sDiNJy_mFcipW35dfyI5c_uKuY_9n-0n6w_1cCqAKGdD54As6Re4GpxvhlQMo-N7skyTnBkxvG0AuweakPwqhz0G6Zeg5AvaQf_FwQDhla0lAObyGsltaktHeM9MMHnuDpAGgX4ZI8D43KG2VGhZiadGYLpggx55i3Pu7FXx7WDmRde7u0ltwz5NA_e0OBmEUrPTnpGzNQg97bLKPROfLoUkqDbfLTk6-ebUEj3kdX4J3CwwJo4LFMp_jVJkgEzWf0gD6JuemWfNGOBLLw6mQ';
      await this.props.db.auth().signInWithCustomToken(token);

    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    // this.props.db.auth().signOut().then(() => {
    //   // Sign-out successful.
    //   console.log('Auth signed out ');
    // }).catch(function(error) {
    //   // An error happened.
    //   console.error('Auth signed out error ', error);
    // });

    try {
      await this.props.db.auth().signOut()
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (<div>
      <button onClick={this.auth}>Auth</button>
      <button onClick={() => this.logout()}>logout</button>
      <p>Auth user: {this.state.user ? this.state.user.uid : 'not authorized'}</p>
    </div>);
  }
}

export default Auth;
