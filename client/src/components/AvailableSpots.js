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
                  <TableCell>Spot Receiver</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
              </TableBody>
            </Table>
          </Paper>
      </div>
    );
  }
}

export default AvailableSpots;
