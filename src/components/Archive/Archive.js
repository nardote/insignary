import React, { Component } from 'react';
import ReactDataGrid from 'griddle-react';
import './Archive.css';


var fakeData =  [
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
},{
  "January": 2,
  "February": 2,
  "March": 2,
  "April": 22,
  "May": 2,
  "June": 2
}
];

class Archive extends Component {
  render() {
    return (
      <div className="archive">
        <h3>Archive</h3>

        <ReactDataGrid results={fakeData} />

      </div>
    );
  }
}

export default Archive;
