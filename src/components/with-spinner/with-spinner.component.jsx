import React from 'react';

import { SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

const WithSpinner = WrappedCpmponent =>  {
  
  const Spinner = ({isLoading, ...otherProps}) => {
    return isLoading 
    ? ( <SpinnerOverlay> <SpinnerContainer /></SpinnerOverlay> )
    : (<WrappedCpmponent {...otherProps} /> )
  };

  return Spinner;
};

export default WithSpinner;
