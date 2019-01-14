import React, { Component } from 'react';

import './Settings.css'

class Settings extends Component {
  render() {
    return (
        <div className="settings ">
            <div className="invitationBlock ">  
                <h3 className="title">FLAG FOR REVIEW</h3>
                <div className="addForm">
                  <span className="msg">When code is flagged for review email thes people:</span>
                  <input type="email" name="email" className="inputText" placeholder="Email Address" />
                  <button className="btn">Send invitation</button>
                </div>
                <ul className="listItems">
                  <li className="item">a@a.com <i className="action close"></i></li>
                  <li className="item">a@a.com <i className="action waiting"></i></li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                </ul>
            </div>
            <div className="invitationBlock ">  
                <h3 className="title">User</h3>
                <div className="addForm">
                  <span className="msg">Current Insignary Clarity Users:</span>
                  <input type="email" name="email" className="inputText" placeholder="Email Address" />
                  <input type="email" name="email" className="inputText" placeholder="User Email" />
                  <input type="email" name="email" className="inputText" placeholder="User Password" />                  
                  <button className="btn">Create User</button>
                </div>
                <ul className="listItems">
                  <li className="item">a@a.com <i className="action close"></i></li>
                  <li className="item">a@a.com <i className="action waiting"></i></li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                  <li className="item">a@a.com</li>
                </ul>
            </div>
            <div className="invitationBlock ">  
                <h3 className="title">Updates</h3>
                <div className="addForm">
                  <span className="msg">Check for code an database updates</span>
                  <div className="checks">
                    <label><input type="checkbox" name="email" className="inputCheck" /> Every Day</label>
                    <label><input type="checkbox" name="email" className="inputCheck" /> Every Week</label>
                  </div>                                
                  
                </div>                
            </div>
            <div className="center">
              <button className="btn">Create User</button>
            </div>
        </div>
    );
  }
}

export default Settings;