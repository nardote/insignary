import React, { Component } from 'react';
import ReactDataGrid from 'griddle-react';
import { observer } from 'mobx-react';
import { Link } from 'react-router'
import api from '../../api';

import './ScanList.css';


var CheckArchiveComponent = React.createClass({
  render: function(){
    return (
        <p>
        <input type="checkbox" name="" checked={this.props.rowData.archive?'checked':''} id={this.props.rowData.id}/>
        <label></label>
        </p>        
    )
  }
});


var LinkComponent = React.createClass({
  render: function(){
    var url ="/dashboard/results/" + this.props.rowData.id ;
    return <Link to={url}>View</Link>
  }
});


var columns = [
  {
    columnName:'archive',
    displayName: 'Archive',    
    customComponent: CheckArchiveComponent 

  },{
    columnName:'created_at',
    sortable: true,
    displayName: 'Date'
  },{
    columnName:'original_file_name',
    sortable: true,
    displayName: 'File'
    
  },{
    columnName:'review',
    sortable: true,
    displayName: 'Review',
    customComponent: LinkComponent 
  }
]


@observer(['state'])
class ScanResults extends Component {

  constructor (props) {
    super(props)
    this.state = {count:0,results:[]}    
    api.getScannedReports(this.props.state.user.access_token)
      .then((response)=>{
          this.setState({
            count:response.count,
            results: response.response
          })
      })
  }

  render() {

    var children = <ReactDataGrid 
                      useGriddleStyles={false}
                      columnMetadata={columns} 
                      columns={['archive','created_at','original_file_name','review']}
                      tableClassName="tab" 
                      results={this.state.results} />;
    if(this.props && this.props.children) {
        children = this.props.children;
    }


    return (
      <div className="results">
        <h3>Results</h3>
        {children}
      </div>
    );
  }
}

export default ScanResults;
