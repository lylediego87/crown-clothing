import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
 
import './cart-dropdown.styles.scss';

import Button from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({cartItems, history, toggleCartHiiden}) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length 
        ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        : <span className='empty-message'> Your cart is empty</span>
      }
    </div>
    <Button onClick={() => { toggleCartHiiden(); history.push('/checkout');}}>
      Checkout
    </Button>
  </div>
);

const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
})

const mapDispatchToProps = dispatch => ({
  toggleCartHiiden: () => dispatch(toggleCartHidden())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));