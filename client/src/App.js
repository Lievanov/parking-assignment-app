import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Request from './components/Request';
import EmailResponse from './components/EmailResponse';
import Dashboard from './components/Dashboard';
import { Route } from 'react-router-dom';
const api = 'http://localhost:5000';

class App extends Component {

  state = {
    userId: "",
    location: "",
    name: "",
    email: '',
    showMessage: "false"
  }

  signUp = (username, password, email, name) => {
    axios.post(`${api}/signup`, {
      username, password, email, name, role: 'user'
    }).then(response => {
      this.setState({
        userId: response.data.id,
        name: response.data.name,
        email: response.data.email,
        location: response.data.location,
        role: response.data.role
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  login = (username, password) => {
    axios.post(`${api}/login/`, {username, password})
      .then(response => {
        this.setState({
          userId: response.data.id,
          location: response.data.location,
          name: response.data.name,
          role: response.data.role
        });
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  createRequest = (startDate, endDate) => {
    const { userId, location } = this.state;
    axios.post(`${api}/parking-loan`, {
      startDate,
      endDate,
      userId,
      location
    })
      .then(response => {
        console.log(response);
        this.setState({ showMessage: "true"});
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  changeRequest = (requestId, status) => {
    axios.patch(`${api}/parking-loan/${requestId}/${status}`)
      .then(response => {
        this.setState({ page: "submit" });
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  render() {
    return (
      <div className="App">

        <Header name={this.state.name}/>

        <Route exact path='/' render={ ({history}) => (
          <Login
            login={ (username, password) => {
              this.login(username, password)
              history.push('/parking-loan')
            }}
            signup={() => {
              history.push('/signup')
            }}
          />
          )}
        />
      <Route path='/signup' render={(props) => (
          <Signup
            createAccount={(username, password, email) => {
              this.signUp(username, password, email)
              props.history.push('/dashboard')
            }}
          />
        )}
      />
      <Route path='/dashboard' render={ (props) => (
          <Dashboard
            createRequest={
              props.history.push('/parking-loan')
            }
          />
        )}
      />
        <Route exact path='/parking-loan'
          render={(props) =>(
            <Request
              {...props}
              createRequest={(startDate, endDate) => {
                this.createRequest(startDate, endDate)
                props.history.push('/')
              }}
            />
          )}
        />

        <Route path="/parking-loan/:id/:status"
          render={(props) =>(
            <EmailResponse
              {...props}
              request={(requestId, status) => {this.changeRequest(requestId, status)}}
              page={(CurrentPage) => this.changePage(CurrentPage)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
