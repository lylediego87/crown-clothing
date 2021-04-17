import React from 'react';
import './collection-item.styles.scss';
import Button from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions' ;

const CollectionItem = ({item, addItem }) => {
  const { name,  price, imageUrl } = item;

  return (
  <div className='collection-item'>
    <div className='image' style={{
      backgroundImage: `url(${imageUrl})`
    }} />
    <div className='collection-footer'>
      <span>{name}</span>
      <span>{price}</span>
    </div>
    <Button inverted onClick={() => addItem(item) } >Add to cart</Button>
  </div>
  )
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null,mapDispatchToProps)(CollectionItem);