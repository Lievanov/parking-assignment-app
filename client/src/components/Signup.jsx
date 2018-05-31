import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    name: ''
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
                <h4>Create new Account</h4>
              </div>
              <form>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  margin="normal"
                  onChange={this.handleChange}
                  required
                  />
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
                  id="email"
                  name="email"
                  label="Email"
                  margin="normal"
                  onChange={this.handleChange}
                  type="email"
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
                <Button type="button" onClick={() => this.props.createAccount(this.state.username, this.state.password, this.state.name, this.state.email)}>Create Account</Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Signup
