import React, { Component } from 'react';

import './ProgressBar.css';


class ProgressBar extends Component {
  render() {
    return (
      <div className="progressbar">
        <div className="bar">
          <div className="progress">
            <span className="msg"><strong>(34%) Uploading</strong> <i>“file_name”</i></span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
