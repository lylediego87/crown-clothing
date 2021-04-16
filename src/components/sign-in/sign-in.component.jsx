import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import {auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''});
    } catch (error) {
      console.error(error); 
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'> I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' lable='Email' value={this.state.email} handleChange={this.handleChange} />
          <FormInput name='password' type='password' lable='Password' value={this.state.password} handleChange={this.handleChange} />
          <div className='buttons'> 
            <Button type='submit'>Sign In</Button>
            <Button onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;