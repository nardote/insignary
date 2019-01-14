import React, { Component } from 'react';
import { Link } from 'react-router'

import SimplePage  from '../SimplePage/SimplePage'

import './Help.css'

class Help extends Component {
  render() {
    var defaultPage = <SimplePage page={this.props.route.defaultPage} />

    return (
        <div className="help">
          <div className="menu">
            <Link to="/help/quick-reference" activeClassName="active">
              Quick reference
            </Link>
            <Link to="/help/scanning" activeClassName="active">
              Scanning
            </Link>
            <Link to="/help/review" activeClassName="active">
              Review Results
            </Link>
            <Link to="/help/exporting" activeClassName="active">
              Exporting Results
            </Link>
          </div>
          <div className="row">
            <div className="column column-50 column-offset-25"> 
              {this.props.children || defaultPage }
            </div>
          </div>
        </div>
    );
  }
}

export default Help;