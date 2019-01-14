import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer } from 'mobx-react'
import './Header.css';

import logo from '../../images/logo.png'; 
import userPic from '../../images/user-pic.png';


@observer(['state'])
class Header extends Component {
  
  render() {
    var img = '';
    if(this.props.state && this.props.state.user && this.props.state.user.image_thumb) {
        //img = <img src={'//insignary-api.theamalgama.com'+this.props.state.user.image_thumb} role="presentation" />
        img = <img src={userPic}  role="presentation" />
    }

    return (
        <header>
          <div className="logo">
            <Link to="/">
              <img src={logo} role="presentation"/>
            </Link>
            <strong>clarity</strong> for Company X</div>
          <div className="header-menu">
            <ul>
              <li>
                <Link to="/dashboard" activeClassName="active">DASHBOARD</Link>
                <ul className="subMenu">
                  <li><Link to="/dashboard/startscan">Start scan</Link></li>
                  <li><Link to="/dashboard/results">Review results</Link></li>
                  <li><Link to="/dashboard/archive">Archive</Link></li>
                </ul>
              </li>
              <li><Link to="/help" activeClassName="active">HELP</Link></li>
              <li><Link to="/settings" activeClassName="active">SETTINGS</Link></li>
            
              <li className="user">
                {img}
                <span className="userName">
                  {<Link to="/profile" >{this.props.state.user.name}</Link> || <Link to="/login" >LOGIN</Link>}
                </span>
              </li>
            </ul>
          </div>
          
        </header>
    );
  }
}

export default Header;
