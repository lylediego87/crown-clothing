import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUp }) => {
  const [credentials, setCredentials] = useState({displayName: '', email: '', password: '',confirmPassword: ''});
  const { displayName, email, password, confirmPassword} = credentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords dont match");
      return;
    }
    signUp({ displayName, email, password});
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({...credentials, [name]: value});
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput type='text' name='displayName' value={displayName} 
          onChange={handleChange} lable='Display Name' required />
        <FormInput type='email' name='email' value={email} 
        onChange={handleChange} lable='Email' required />
        <FormInput type='password' name='password' value={password} 
        onChange={handleChange} lable='Password' required />
        <FormInput type='password' name='confirmPassword' value={confirmPassword} 
        onChange={handleChange} lable='Confirm Password' required />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );   
}

const mapDispatchToProps = dispatch => ({
  signUp: ({displayName, email, password }) => {
    dispatch(signUpStart({displayName,email,password}))
  }
});
export default connect(null,mapDispatchToProps)(SignUp);