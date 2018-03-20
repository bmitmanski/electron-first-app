import React from 'react';
import rp from 'request-promise';
const {shell} = require('electron');

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {logged: false};
  }

  authenticateUser (username, password) {
    const url = 'https://aslive-authentication.dev.mmgapi.net/authenticate';
    const productID = '2';
    return rp({
      method: 'POST',
      url,
      body: {
        username,
        password,
        productID
      },
      json: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    this.authenticateUser(login, password)
      .then(result => {
        console.log('Login  result', result);
        this.setState({
          logged: true,
          token: result.sessionToken
        })

      })
      .catch(err => console.error(err));
  }

  openInNewWindow(e) {
    e.preventDefault();

    shell.openExternal('http://local.dealreporter.com:19011/intelligence/view/prime-2376115/'+this.state.token);
    return false;
  }

  logout() {
    rp({
      method: 'DELETE',
      uri: 'https://aslive-authentication.dev.mmgapi.net/session/' + this.state.token
    }).then(() => {
      this.setState({
        logged: false
      })
    })
  }


  render() {
    return this.state.logged ? (<div>
      <a onClick={(e) => this.openInNewWindow(e)}>INTEL LINK</a>
      <button onClick={() => this.logout()}>logout</button>
    </div>)
    :
      (<div>
      <h2>Login</h2>

      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Login:
          <input
            type="text"
            ref={input => {
              this.loginInput = input;
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            ref={input => {
              this.passwordInput = input;
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>);
  }
}

export default Login;
