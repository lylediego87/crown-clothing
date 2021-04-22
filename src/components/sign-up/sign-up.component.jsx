import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword} = this.state;
    const { signUp } = this.props;

    if(password !== confirmPassword){
      alert("Passwords dont match");
      return;
    }
    signUp({ displayName, email, password});
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput type='text' name='displayName' value={displayName} 
            onChange={this.handleChange} lable='Display Name' required />
          <FormInput type='email' name='email' value={email} 
          onChange={this.handleChange} lable='Email' required />
          <FormInput type='password' name='password' value={password} 
          onChange={this.handleChange} lable='Password' required />
          <FormInput type='password' name='confirmPassword' value={confirmPassword} 
          onChange={this.handleChange} lable='Confirm Password' required />

          <Button type='submit'>Sign Up</Button>
        </form>
      </div>
    );  
    ; 
  } 
}

const mapDispatchToProps = dispatch => ({
  signUp: ({displayName, email, password }) => {
    dispatch(signUpStart({displayName,email,password}))
  }
});
export default connect(null,mapDispatchToProps)(SignUp);