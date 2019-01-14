import React, { Component } from 'react';
import { observer } from 'mobx-react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
//import ProgressBar from '../ProgressBar/ProgressBar';
import './Layout.css';



@observer(['state'])
class Layout extends Component {
  render() {
    
    return (
      <div className="app">
        <Header />
        {/*<ProgressBar />*/}
        <div className="content">
          <BreadCrumbs />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
