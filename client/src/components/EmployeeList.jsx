import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

class EmployeeList extends Component{
  render() {
    return (
      <div className='tableMargin'>
        <h3>Employee's List</h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Spot Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default EmployeeList
