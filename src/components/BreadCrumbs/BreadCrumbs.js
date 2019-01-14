import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Link } from 'react-router'

import './BreadCrumbs.css';

@observer(['state'])
class BreadCrumbs extends Component {
  render() {
    console.log(this.props.state.routerState)
    return (
      <div className="breadcrumbs">          
          {this.props.state.routerState.router.map((child,i)=> {
              var separator = '';
              if(i!=0) {
                separator = '>';
              }
              var item = <span key={i}>{separator} <Link to={child.path}>{child.title}</Link></span>
              return item
          })}
      </div>
    );
  }
}

export default BreadCrumbs;
