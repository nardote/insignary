import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router'
import api from '../../api';
import './Login.css';



@observer(['state'])
class Login extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        email:{
            error:false,
            value:'',
            errorMsg: 'INVALID'
        },
        pass:{
            error:false,
            value:'',
            errorMsg: 'INVALID'
        }
    }
  }
  
  onSubmit(event) {
    
      event.preventDefault();
      //hago comprobaciones
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
      if(!this.refs.email || this.refs.email.value === "" || !re.test(this.refs.email.value)) {
        this.setState(Object.assign(this.state,{
          email:{
              error:true,
               errorMsg: 'INVALID'
          }
        }))
      } else {
        this.setState(Object.assign(this.state,{
          email:{
              error:false
          }
        }))
      }


      if(!this.refs.pass || this.refs.pass.value === "" ) {
        this.setState(Object.assign(this.state,{
          pass:{
              error:true,
               errorMsg: 'INVALID'
          }
        }))
      } else {
        this.setState(Object.assign(this.state,{
          pass:{
              error:false
          }
        }))
      }


      //si no hay error envio      
      if(!this.state.email.error &&
         !this.state.pass.error) {
            //armo objeto para el envio
            var data = {
                email:this.refs.email.value,
                password:this.refs.pass.value,
                grant_type: "password"
              }
            
            //envio
            api.getLogin(data)
              .then((response)=>{
                  
                  if(response.error && response.error === "invalid_grant") {
                      this.setState(Object.assign(this.state,{
                        email:{
                            error:true,
                             errorMsg: 'INVALID'
                        },
                        pass:{
                            error:true,
                             errorMsg: 'INVALID'
                        }
                      }))
                  } else {
                    this.props.state.user.setSession(response)
                    this.props.history.push('/dashboard');
                  }
              })
         }
  }
  render() {
    const emailErrorClass = this.state.email.error?'show':'';
    const passErrorClass = this.state.pass.error?'show':'';
    

    return (
      <div className="login">
          <div></div>
          <form action="" onSubmit={this.onSubmit}>
            <div className="form-row">
              <label>EMAIL:</label>
              <input type="email" name="email" ref="email"  placeholder="Email"/>
              <div className={"error " + emailErrorClass}>{this.state.email.errorMsg}</div>
            </div>
            <div className="form-row">
              <label>PASSWORD:</label>
              <input type="password" name="pass" ref="pass"  placeholder="Password" />
              <div className={"error " + passErrorClass}>{this.state.pass.errorMsg}</div>
            </div>  
            <div className="form-row">
              <input className="checkbox" type="checkbox" name="" id="rememberMe" /> <label className="remember-me" htmlFor="rememberMe">Remember me</label> 
              <a className="forgot-pass" href="">FORGOT YOUR PASSWORD</a>
            </div>
            <div className="button-wrapper">
            <button className="btn" type="submit">Login</button>
            <p>Not yet member? <Link to="signup">Create account</Link></p>
            </div>
          </form>
      </div>
    );
  }
}

export default Login;
