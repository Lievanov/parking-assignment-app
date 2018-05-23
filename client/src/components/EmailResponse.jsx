import React, { Component } from 'react';

class EmailResponse extends Component {

  componentDidMount(){
    const {id, status} = this.props.match.params;
    console.log(`${id} and ${status}`);
    if(id){
      this.props.page("email");
    }
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
