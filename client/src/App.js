import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Request from './components/Request';
import EmailResponse from './components/EmailResponse';
import { Route } from 'react-router-dom';

class App extends Component {

  state = {
    page: "login",
    userId: "",
    location: "",
    name: "",
    showMessage: "false"
  }

  changePage = page => {
    this.setState({ page })
  }

  login = (username, password) => {
    axios.get(`http://localhost:5000/login/${username}/${password}`, {'Accept': 'application/json'})
      .then(response => {
        this.setState({
          userId: response.data.id,
          location: response.data.location,
          name: response.data.name,
          page: "Request"
        });
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  createRequest = (startDate, endDate) => {
    const { userId, location } = this.state;
    axios.post(`http://localhost:5000/parking-loan`, {
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
    axios.patch(`http://localhost:5000/parking-loan/${requestId}/${status}`)
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
        {this.state.page === "login" &&
          <Login
            login={(username, password) => {
              this.login(username, password)
            }}
        />}
        {this.state.page === "Request" &&
          <Request createRequest={(startDate, endDate) => {
            this.createRequest(startDate, endDate)
          }}
          showMessage={this.state.showMessage}
          />
        }
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
