import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart  } from '../../redux/user/user.actions';

const SignIn = ({ signInWithEmail, signInWithGoogle }) => {

  const [credentials, setCredentials] = useState({email: '', password: ''});
  const { email, password } = credentials;

  const handleSubmit = async event => {
    event.preventDefault();
    signInWithEmail(email,password);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({...credentials, [name]: value});
  }

  return (
    <div className='sign-in'>
      <h2 className='title'> I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' lable='Email' value={email} handleChange={handleChange} />
        <FormInput name='password' type='password' lable='Password' value={password} handleChange={handleChange} />
        <div className='buttons'> 
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={signInWithGoogle} isGoogleSignIn>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  )
  
}

const mapDispatchToProps = dispatch => ({
  signInWithGoogle: () => dispatch(googleSignInStart()),
  signInWithEmail: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);