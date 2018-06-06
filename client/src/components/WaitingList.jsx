import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class WaitingList extends Component {
  render() {
    return (
      <div>
        <h3>Waiting List (in order)</h3>
        <Paper>
          <List component="nav">
            {this.props.waitList.map(emp => (
              <div>
                <ListItem key={emp}>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                  <ListItemText primary={emp}/>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default WaitingList;
