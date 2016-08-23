import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import request from 'superagent';
import TextField from 'material-ui/TextField';
import store from '../../../..//redux/store';

const fieldStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
};

const buttonStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
  color: '#FFFFFF',
  backgroundColor: '#607D8B',
  marginTop: '20px',
};

class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: '',
      password: '',
      snackBarOpen: false
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.logInUser = this.logInUser.bind(this);
  }

  usernameChange(event) {
    this.setState({ username: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  logInUser() {
    request
      .post('/api/users/login')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .end((error, response) => {
        if (error) {
          this.setState({ snackBarOpen: true });
        }

        if (response.statusCode === 401) {
          this.setState({ snackBarOpen: true });
        } else {
          localStorage.setItem('token', response.body.token);
          store.dispatch({
            type: 'LOG_IN_USER_SUCCESS',
            payload: {
              token: response.body.token,
            }
          });
        }
      });
  }

  render() {
    return (
      <div>
        <div style={fieldStyle}>
          <TextField
            style={{ width: '100%' }}
            hintText="Username"
            floatingLabelText="Username"
            onChange={this.usernameChange}
          />
        </div>
        <div style={fieldStyle}>
          <TextField
            style={{ width: '100%' }}
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.passwordChange}
          />
        </div>
        <FlatButton
          style={buttonStyle}
          label="LOG IN"
          onClick={this.logInUser}
        />
        <Snackbar
          open={this.state.snackBarOpen}
          style={{ textAlign: 'center' }}
          message="Invalid username or password"
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default LogInForm;

