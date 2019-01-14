import React, { Component } from 'react';
import { Link } from 'react-router'

import { observer } from 'mobx-react'
import Dropzone from 'react-dropzone';

import attachIcon from '../../images/icons/attach.png'
import api from '../../api';
import './UserProfile.css';

@observer(['state'])
class UserProfile extends Component {
  
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        name:{
            error:false,
            value:'',
            errorMsg: ''
        },
        email:{
            error:false,
            value:'',
            errorMsg: ''
        },
        pass:{
            error:false,
            value:'',
            errorMsg: ''
        },
        repass:{
            error:false,
            value:'',
            errorMsg: '',
            hidden:true
        },
        file:{
            error:false,
            value:'',
            errorMsg: ''
        },
        currentpass:{
            error:false,
            value:'',
            errorMsg: '',
            hidden:true
        },
        fileName:'Attach image', 
    }
  }
  onSubmit(event) {
      event.preventDefault();

      var objectError = {};

      //hago comprobaciones
      if(!this.refs.name || this.refs.name.value === "" ) {
        objectError.name = {
              error:true,
              errorMsg: 'Invalid'
        }
      } else {
        objectError.name = {
              error:false
        }
      }

    
      
      if(!this.refs.pass || this.refs.pass.value === "" ) {
        
     
        
      } else {
        if( this.refs.pass.value.length < 8) {
          objectError.pass = {
                error:true,
                errorMsg: 'Invalid password +8'
          }
        } else {
          objectError.pass = {
                error:false
            }
          if(!this.refs.repass || this.refs.repass.value === "" || this.refs.repass.value !== this.refs.pass.value) {
            objectError.repass = {
                  error:true,
                  errorMsg: 'Invalid'
            }
          } else {
            objectError.pass = {
                error:false
            }
            objectError.repass = {
                  error:false
            }
          }

           if(!this.refs.currentpass || this.refs.currentpass.value === "" ) {
              objectError.currentpass = {
                    error:true,
                    errorMsg: 'Requiered for change password'
              }
            } else {
              objectError.currentpass = {
                    error:false
              }
            }
          
        }
      }


      this.setState(objectError, function () {
            //si no hay error envio      
            if(!this.state.name.error &&
              !this.state.pass.error &&
              !this.state.repass.error &&
              !this.state.currentpass.error ) {
                  //armo objeto para el envio
               
                  var data = new FormData()   
                  if(this.state.files) {
                    data.append('image', this.state.files[0])
                  }
                  data.append('name', this.refs.name.value)
                  

                  if(this.refs.pass.value !== '') {
                    data.append('password', this.refs.pass.value)
                    data.append('password_confirmation', this.refs.repass.value)
                    data.append('current_password', this.refs.currentpass.value)
                  }

                  
                  //envio
                  api.setUserProfile(this.props.state.user.access_token,data)
                    .then((response)=>{
                      //errores enviados por el servidor
                      if(response.error) {                  
                        if(response.error === "incorrect_password") {
                          this.setState({
                            current:{
                                error:true,
                                errorMsg: response.error_description
                            }
                          })
                        } else {
                          this.setState({
                            name:{
                                error:true,
                                errorMsg: 'Something wrong'
                            }
                          })
                        }
                      } else {
                        
                        this.props.history.push('/login');
                      }
                      
                    })
              }
        })



      
  }
  onDrop(files) {
    console.log('drop',files)

    this.setState({
        files: files,
        fileName: files[0].name
      });

  }
  onPassChange(e) {
    console.log(e.target.value)
    if(e.target.value !== '') {
      this.setState({
          repass: {
              hidden:false
          },
          currentpass: {
              hidden:false
          }
      })
    } else {
      this.setState({
          repass: {
              hidden:true
          },
          currentpass: {
              hidden:true
          }
      })
    }
  }
  render() {

    return (      
      <div className="signup">
          <div></div>
          <form action="" onSubmit={this.onSubmit}>
          
              <div className="form-row">
                <label>Name:</label>
                <input type="text" name="name" ref="name"  placeholder="Name" autocomplete="off"/>
                <div className={"error " + (this.state.name.error?'show':'')}>{this.state.name.errorMsg}</div>
              </div>
              <div className="form-row">
                <Dropzone onDrop={this.onDrop} className="input-file">
                      <div className="placeholder">{this.state.fileName}</div>
                      <div className="input-file-button">
                        <img src={attachIcon} role="presentation"/>
                      </div>
                </Dropzone>
              </div>
              <div className="form-row">
                <label>Password:</label>
                <input type="password" name="pass" ref="pass" onChange={this.onPassChange.bind(this)}  placeholder="Password" autocomplete="off"/>
                <div className={"error " + (this.state.pass.error?'show':'')}>{this.state.pass.errorMsg}</div>
              </div>
              <div className={"form-row " + (this.state.repass.hidden?'hidden':'')}>
                <label>Confirm password:</label>
                <input type="password" name="repass" ref="repass"  placeholder="Re Password" autocomplete="off"/>
                <div className={"error " + (this.state.repass.error?'show':'')}>{this.state.repass.errorMsg}</div>
              </div>
              
              <div className={"form-row " + (this.state.currentpass.hidden?'hidden':'')}>
                <label>Current password:</label>
                <input type="password" name="currentpass" ref="currentpass"  placeholder="Current Password" autocomplete="off" />
                <div className={"error " + (this.state.currentpass.error?'show':'')}>{this.state.currentpass.errorMsg}</div>
              </div>
          
              <div className="button-wrapper">
                <button className="btn" type="submit">SignUp</button>
              </div>
          </form>
      </div>
    );
  }
}

export default UserProfile;
