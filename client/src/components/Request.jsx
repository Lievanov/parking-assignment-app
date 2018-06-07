import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Request extends Component {

  state = {
    startDate: '',
    endDate: ''
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
              <h2>Free a Parking Spot</h2>
              <form>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  type="text"
                  label="Location"
                  value={this.props.location}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  disabled
                />
                <TextField
                  fullWidth
                  id="startDate"
                  name="startDate"
                  type="date"
                  label="Start Date"
                  margin="normal"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
                <TextField
                  fullWidth
                  id="endDate"
                  name="endDate"
                  type="date"
                  label="End Date"
                  margin="normal"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
              <Button type="button" onClick={() => {this.props.createRequest(this.state.startDate, this.state.endDate)}}>Submit Request</Button>
              </form>
              {this.props.showMessage && <h2>Your request has been sent !</h2>}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Request;
