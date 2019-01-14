import React, { Component } from 'react';
import {observer} from "mobx-react";
var DoughnutChart = require("react-chartjs").Doughnut;

import './FileDetail.css';

@observer(['state'])
class FileDetail extends Component {
  constructor (props) {
    super(props)
    this.state={file:{}}
  }
  componentWillMount(){
       
    

      
        
    //si tengo id de archivo llamo el detalle
    
            
        
  }
  render() {

    var chartData = [];
    var chart = '';
    if(this.props.state.fileDetail.fileDetails.ranking) {
      this.props.state.fileDetail.fileDetails.ranking.stringresults.reports.map(child => {                          
                chartData.push({
                  label:child.packagename,
                  value: child.percentage

                })
                
      })
      chart = <DoughnutChart data={chartData}/>
      
    }

    return (
      <div className="filedetail">
        <h3>
          File detail {this.props.state.fileDetail.name} 
        </h3>
        <div className="row">
          <div className="column column-50">
            {chart}
          </div>
          <div className="column column-50">
            {chartData.map(child => {                          
               return <div key={child.label}> {child.label}  - {child.value} </div>          
            })}
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default FileDetail;
