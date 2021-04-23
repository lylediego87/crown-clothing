import React,{ useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionContainer from '../collection/collection.container';


const ShopPage = ({fetchCollectionStart, match}) => {

  useEffect(() => {
    fetchCollectionStart();
  },[fetchCollectionStart]);

  return (
    <div className='shop-page'> 
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionContainer}  />
    </div>
    );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
})  

export default connect(null, mapDispatchToProps)(ShopPage);