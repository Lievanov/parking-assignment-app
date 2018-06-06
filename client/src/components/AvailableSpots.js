import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class AvailableSpots extends Component {
  render() {
    return (
      <div className='tableMargin'>
        <h3>Available Spots</h3>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Spot Owner</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Current Requestor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.spots.map(spot => (
                  <TableRow key={spot.id}>
                    <TableCell>{ spot.spotOwner }</TableCell>
                    <TableCell>{spot.startDate}</TableCell>
                    <TableCell>{spot.endDate}</TableCell>
                    <TableCell>{spot.location}</TableCell>
                    <TableCell>{spot.requestorName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
      </div>
    );
  }
}

export default AvailableSpots;
