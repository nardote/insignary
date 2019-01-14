import React, { Component } from 'react';

import './LoginLayout.css';
import logo from '../../images/logo.png'; 

class Layout extends Component {
  render() {
    
    return (
      <div className="login-layout">
        <div className="presentation">
            <img src={logo} role="presentation"/>
            <p>We are building a next generation solution to monitor the Open Source supply chain.</p>
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default Layout;
