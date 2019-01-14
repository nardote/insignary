import React, { Component } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react'
import Dropzone from 'react-dropzone';
import api from '../../api';

import './StartScan.css';
import loadingImg from '../../images/loading.gif'; 

import attachIcon from '../../images/icons/attach.png'


@observer(['state'])
class StartScan extends Component {
  constructor(props) {
    super(props)
    this.state = {
                  modalIsOpen: false, 
                  file:[], 
                  fileName:'Attach code to scan', 
                  modalUploadingIsOpen: false,
                  modalFinishIsOpen: false
                 };
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.beginUpload = this.beginUpload.bind(this)
    this.onDrop = this.onDrop.bind(this)
    
  }
  openModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: true});
  }
  closeModal(e){
    e.preventDefault();
    this.setState({modalIsOpen: false, modalFinishIsOpen: false});
  }

  beginUpload(e) {
    e.preventDefault();
    this.setState({modalIsOpen: false});

    var data = new FormData()   
    data.append('input_package', this.state.files[0])

    

    this.setState({
        modalUploadingIsOpen: true
      });


    api.getUploadFile(this.props.state.user.access_token, data)
              .then((response)=>{
                  console.log(response)
                  this.setState({
                      modalUploadingIsOpen: false,
                      modalFinishIsOpen: true
                  });
              }).catch((e) => {
                console.log(e)
                 this.setState({
                      modalUploadingIsOpen: false,
                      modalFinishIsOpen: false
                  });
              })
    
  }
  
  onDrop(files) {
    console.log('drop',files)

    this.setState({
        files: files,
        fileName: files[0].name
      });

  }

  render() {  
    return (
      
        <form className="startscan">
            <Dropzone onDrop={this.onDrop} className="input-file">
                <div className="placeholder">{this.state.fileName}</div>
                <div className="input-file-button">
                  <img src={attachIcon} role="presentation"/>
                </div>
            </Dropzone>


          <div className="row">
            <div className="column column-50">
              <h5>CHOOSE THE TYPE OF SCAN YOU WANT:</h5>
              <p>
              <input type="checkbox" className="checkbox" name="" id="compliance" />
              <label htmlFor="compliance">Compliance</label>
              </p>

            </div>
            <div className="column column-50">
              <h5>CHOOSE  THE MODULES TO USE IN YOUR SCAN:</h5>
              <p>
                <input type="checkbox" className="checkbox" name="" id="litigators"/>
                <label htmlFor="litigators">Know litigators</label>
              </p>
              <p>
                <input type="checkbox" className="checkbox" name="" id="complexLicensing"/>
                <label htmlFor="complexLicensing">Code with complex licensing</label>
              </p>

            </div>
          </div>
          <div className="row add-margin">
            <div className="column column-50">
              <p>
              <input type="checkbox" className="checkbox" name="" id="security" />
              <label htmlFor="security">Security</label>
              </p>
            </div>
            <div className="column column-50">
              <p>
                <input type="checkbox" className="checkbox" name="" id="usDatabase" />
                <label htmlFor="usDatabase">US National Vulnerability Database</label>
              </p>
              <p>
                <input type="checkbox" className="checkbox" name="" id="fedora"/>
                <label htmlFor="fedora">Fedora Security Reports</label>
              </p>
              <p>
                <input type="checkbox" className="checkbox" name="" id="debian"/>
                <label htmlFor="debian">Debian Security Reports</label>
              </p>
              <p>
                <input type="checkbox" className="checkbox" name="" id="vuln" />
                <label htmlFor="vuln">VulnDB</label>
              </p>
            </div>
            
          </div>
          <button type="button" onClick={this.openModal} className="btn">START SCANNING</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className='modal'
            multiple='false'
            overlayClassName='modal-overlay' >
            <div className="msg">
              <h2 className="title" ref="subtitle">Start This task?</h2>
              <p className="text">Are you sure you want to scan “{this.state.fileName}”?</p>
              
            </div>
            <div className="actions">
              <button className="btn" onClick={this.closeModal}>No</button>
              <button className="btn callToAction" onClick={this.beginUpload}>Yes</button>
            </div>            
          </Modal>
          <Modal
            isOpen={this.state.modalUploadingIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className='modal'
            multiple='false'
            overlayClassName='modal-overlay' >
              <div className="msg">
                <h2 className="title" ref="subtitle">Uploading !!</h2>
                <p className="text">The file “{this.state.fileName}” is uploading.</p>
                <img src={loadingImg} role="presentation" />
              </div>                           
                      
          </Modal>
          <Modal
            isOpen={this.state.modalFinishIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className='modal'
            multiple='false'
            overlayClassName='modal-overlay' >
              <div className="msg">
                <h2 className="title" ref="subtitle">Finish</h2>
                <p className="text">The file “{this.state.fileName}” .</p>
              </div>  
              <div className="actions">
                <button className="btn callToAction" onClick={this.closeModal}>Ok</button>
              </div>  
          </Modal>
        </form>
    );
  }
}

export default StartScan;
