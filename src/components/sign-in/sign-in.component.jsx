import React from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart  } from '../../redux/user/user.actions';

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
    const { signInWithEmail } = this.props;
    const { email, password } = this.state;
    
    signInWithEmail(email,password);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { signInWithGoogle } = this.props;
    return (
      <div className='sign-in'>
        <h2 className='title'> I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' lable='Email' value={this.state.email} handleChange={this.handleChange} />
          <FormInput name='password' type='password' lable='Password' value={this.state.password} handleChange={this.handleChange} />
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
}

const mapDispatchToProps = dispatch => ({
  signInWithGoogle: () => dispatch(googleSignInStart()),
  signInWithEmail: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);