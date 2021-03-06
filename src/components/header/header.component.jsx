import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles' 

const Header = ({currentUser, hidden, signOut, cartItems}) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop' >SHOP</OptionLink>
      { currentUser ? 
          <OptionDiv onClick={ () => signOut(cartItems) }>SIGN OUT</OptionDiv> 
        : <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    { hidden ? null : <CartDropdown />}
  </HeaderContainer>
);


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  signOut: (cartItems) => dispatch(signOutStart({ cartItems }))
});

export default connect(mapStateToProps, mapDispatchToProps)( Header);