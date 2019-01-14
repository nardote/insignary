import React, { Component } from 'react';

import './SimplePage.css';


class SimplePage extends Component {
  render() {

    var page = this.props.page?this.props.page.content:this.props.route.page.content;
    var title = this.props.page?this.props.page.title:this.props.route.page.title;
    return (
      <div className="simplepage">
          <h2 className="title">{title}</h2>
          <div className="contentText" dangerouslySetInnerHTML={{__html: page}} />
      </div>
    );
  }
}

export default SimplePage;
