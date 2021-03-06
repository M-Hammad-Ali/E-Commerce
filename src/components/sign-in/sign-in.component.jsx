import React, { Component } from 'react'

import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends Component {
  state = { 
    email: '',
    password: '',
  }

  handleSubmit =async (event)=>{
    event.preventDefault();
    const {email,password} = this.state;
    console.log(this.state);
    try{
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({email:'',password:''})
    }catch(err){
      console.error(err)
    }

    this.setState({email:"",password:""})
  }

  handleChange = (event) => {
    const {value,name} = event.target;
    console.log(event.target.name);
    this.setState({[name]:value})
  }

  render() { 
    return ( 
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email" 
            value={this.state.email} 
            handleChange={this.handleChange}
            label = "Email"
            required
          />
          <FormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick = {signInWithGoogle} isGoogleSignIn>
              Sign in With Google
            </CustomButton>
          </div> 
        </form>
      </div>
    );
  }
}
 
export default SignIn;