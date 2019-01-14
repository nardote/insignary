import React, { Component } from 'react';
import { Link } from 'react-router'

import startScanIcon from '../../images/icons/start_scan.png'
import reviewScanIcon from '../../images/icons/review_scan.png'
import archiveScanIcon from '../../images/icons/archive_scan.png'



import './Dashboard.css';


class Nav extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="start-options">
          <Link to="/dashboard/startscan">
            <img src={startScanIcon} role="presentation"/>
            Start a scan
          </Link>
          <Link to="/dashboard/results">
            <img src={reviewScanIcon} role="presentation"/>
            Review scan results
          </Link>
          <Link to="/dashboard/archive">
            <img src={archiveScanIcon} role="presentation"/>
            Open the archive
          </Link>
          
        </div>
        <div className="status">
        <p className="waiting">SCANS WAITING FOR REVIEW: 4</p>
        <p className="archived">NUMBER OF ARCHIVED SCANS: 4</p>
        </div>
      </div>
    );
  }
}

export default Nav;
