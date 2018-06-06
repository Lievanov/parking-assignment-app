import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Request from './components/Request';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import EmailResponse from './components/EmailResponse';
import { Route } from 'react-router-dom';
const api = 'http://localhost:5000';

class App extends Component {

  state = {
    page: "login",
    userId: "",
    location: "",
    name: "",
    showMessage: "false",
    employees: []
  }

  convertObjectoToArray = objName => {
    const allKeys = Object.keys(objName);
    return allKeys.map(key => objName[key]);
  }

  componentDidMount(){
    this.getEmployees();
  }

  changePage = page => {
    this.setState({ page })
  }

  getEmployees = async () => {
    const employees = await axios.get(`${api}/employees`);
    console.log('await ' + this.convertObjectoToArray(employees.data))
    this.setState({employees: this.convertObjectoToArray(employees.data)})
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
    axios.get(`${api}/login/${username}/${password}`, {'Accept': 'application/json'})
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

        <Route exact path='/' render={ ({history}) => (
          <Login
            login={ (username, password) => {
              this.login(username, password)
              history.push('/dashboard')
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
            {...props}
            employees={this.state.employees}
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
