import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="login">
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <div className="formBackground">
              <div>
                <img src="login-logo.png" height="60px" width="260px" alt="login-logo"></img>
              </div>
              <form>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  margin="normal"
                  onChange={this.handleChange}
                  required
                  />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  margin="normal"
                  onChange={this.handleChange}
                  type="password"
                  required
                  />
                <Button type="button" onClick={() => this.props.login(this.state.username, this.state.password)}>Login</Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
