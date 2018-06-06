import React, { Component } from 'react';
import EmployeeList from './EmployeeList';
import AvailableSpots from './AvailableSpots';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/parking-loan">Free Spot</Link>
        <Grid container spacing={16}>
          <Grid xs={12} sm={6}>
            <EmployeeList employees={this.props.employees}/>
          </Grid>
          <Grid xs={12} sm={6}>
            <AvailableSpots />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
