import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  render(){
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: '#B42529' }}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Rulesware - Parking App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
