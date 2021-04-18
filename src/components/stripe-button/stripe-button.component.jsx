import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const key = "pk_test_51IhcUYAznl80sQNz3wOa2gmw0x3SKvdcrfCHVivhxgAOqUqgKK3mk82cQZhkgSpxps0COL1pmtvWBrTCgMYtvDjP00gIgDNaic"

  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  }

  return(
    <StripeCheckout 
      label='Pay Now'
      name='Crown Clothing'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your Total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={key}
    />
  )
}

export default StripeCheckoutButton;