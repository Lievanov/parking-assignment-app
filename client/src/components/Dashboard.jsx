import React, { Component } from 'react';
import EmployeeList from './EmployeeList';
import AvailableSpots from './AvailableSpots';
import WaitingList from './WaitingList';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/parking-loan">Free Spot</Link>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={12}>
            <EmployeeList employees={this.props.employees}/>
          </Grid>
          <Grid item xs={12}>
            <AvailableSpots
              spots={this.props.spots}
              employee={(id) => {this.props.employee(id)}}
            />
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <WaitingList
              waitList={this.props.waitList}
              />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
