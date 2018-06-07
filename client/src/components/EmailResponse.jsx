import React, { Component } from 'react';

class EmailResponse extends Component {

  componentDidMount(){
    const {id, status} = this.props.match.params;
    console.log(`${id} and ${status}`);
    this.props.request(id, status);
  }

  render() {
    return (
      <div className="login">
        <h1>Thank you for your submit</h1>
      </div>
    );
  }
}

export default EmailResponse;
