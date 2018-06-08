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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const api = 'http://localhost:5000';

class App extends Component {

  state = {
    page: "login",
    userId: "",
    location: "",
    name: "",
    showMessage: "false",
    employees: [],
    spots: [],
    waitList: []
  }

  convertObjectoToArray = objName => {
    const allKeys = Object.keys(objName);
    return allKeys.map(key => objName[key]);
  }

  async componentDidMount(){
    await this.getEmployees();
    await this.getAvailableSpots();
    await this.getWaitList();
  }

  changePage = page => {
    this.setState({ page })
  }

  updateWaitList = () => {
    const waitList = this.state.waitList,
          lastRequestor = waitList[0];
    waitList.shift();
    waitList.push(lastRequestor);
    this.setState({ waitList });
  }

  updateAvailableSpot = (lastSpot, isNewSpot) => {
    // this function must be changed once the app has a real database
    if(isNewSpot){
      this.setState({ spots: [...this.state.spots, lastSpot]})
    } else {
      const spots = this.state.spots;
      spots.pop();
      spots.push(lastSpot);
      this.setState({ spots });
    }
  }

  getEmployees = async () => {
    const employees = await axios.get(`${api}/employees`);
    this.setState({employees: this.convertObjectoToArray(employees.data)})
  }

  getWaitList = async (id) => {
    const waitList = await axios.get(`${api}/waiting-list`);
    this.setState({ waitList: waitList.data });
  }

  getAvailableSpots = async () => {
    const spots = await axios.get(`${api}/requests`);
    this.setState({spots: spots.data})
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
        toast.success(`Welcome to the Parking Loan Application!`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
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
        this.updateAvailableSpot(response.data ,true);
        toast.success(`Your spot is now available !`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
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
            spots={this.state.spots}
            waitList={this.state.waitList}
          />
        )}
      />
        <Route exact path='/parking-loan'
          render={(props) =>(
            <Request
              {...props}
              location={this.state.location}
              createRequest={(startDate, endDate) => {
                this.createRequest(startDate, endDate)
                this.updateWaitList();
                props.history.push('/dashboard')
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
              employee={(id) => {this.getEmployeeInfo(id)}}
            />
          )}
        />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        dragablepauseOnHover
      />
      </div>
    );
  }
}

export default App;
