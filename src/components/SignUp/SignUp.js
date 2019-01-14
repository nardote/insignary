import React, { Component } from 'react';
import api from '../../api'
import './SignUp.css';




class SignUp extends Component {
  
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
            errorMsg: ''
        }
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

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
      if(!this.refs.email || this.refs.email.value === "" || !re.test(this.refs.email.value)) {
        objectError.email = {
              error:true,
              errorMsg: 'Invalid'
        }
      } else {
        objectError.email = {
              error:false
        }
      }
      console.log(!this.refs.pass || this.refs.pass.value === "" || this.refs.pass.value.length <= 8)
      if(!this.refs.pass || this.refs.pass.value === "" ) {
        
        objectError.pass = {
              error:true,
              errorMsg: 'Invalid'
        }
        
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
        }
      }

      if(!this.refs.repass || this.refs.repass.value === "" || this.refs.repass.value !== this.refs.pass.value) {
        objectError.repass = {
              error:true,
              errorMsg: 'Invalid'
        }
      } else {
        objectError.repass = {
              error:false
        }
      }

      this.setState(objectError, function () {
            //si no hay error envio      
            if(!this.state.name.error &&
              !this.state.email.error &&
              !this.state.pass.error &&
              !this.state.repass.error ) {
                  //armo objeto para el envio
                  var data = {
                      email:this.refs.email.value,
                      name: this.refs.name.value,
                      password:this.refs.pass.value,
                      password_confirmation: this.refs.repass.value

                    }
                  
                  //envio
                  api.setUser(data)
                    .then((response)=>{
                      //errores enviados por el servidor
                      if(response.error) {                  
                        if(response.error === "invalid_resource") {
                          this.setState({
                            email:{
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
  render() {

    return (      
      <div className="signup">
          <div></div>
          <form action="" onSubmit={this.onSubmit}>
          <div className="form-row">
            <label>Name:</label>
            <input type="text" name="name" ref="name"  placeholder="Name"/>
            <div className={"error " + (this.state.name.error?'show':'')}>{this.state.name.errorMsg}</div>
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input type="email" name="email" ref="email"  placeholder="Email"/>
            <div className={"error " + (this.state.email.error?'show':'')}>{this.state.email.errorMsg}</div>
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input type="password" name="pass" ref="pass"  placeholder="Password" />
            <div className={"error " + (this.state.pass.error?'show':'')}>{this.state.pass.errorMsg}</div>
          </div>
          <div className="form-row">
            <label>Confirm password:</label>
            <input type="password" name="repass" ref="repass"  placeholder="Re Password" />
            <div className={"error " + (this.state.repass.error?'show':'')}>{this.state.repass.errorMsg}</div>
          </div>
          
            <div className="button-wrapper">
              <button className="btn" type="submit">SignUp</button>
            </div>
          </form>
      </div>
    );
  }
}

export default SignUp;
