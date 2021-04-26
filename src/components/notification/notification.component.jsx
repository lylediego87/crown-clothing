import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {Title, ContentContainer,Message } from  './notification.styles';
import { removeNotification } from '../../redux/notification/notification.actions';

const Notification = ({note, removeNote, ...props}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => removeNote(note), 5000);
    return () => clearTimeout(timer);
  }, [note, removeNote]);

  return(
    <ContentContainer { ...props } >
      <Title>{note.title}</Title>
      <Message>{note.message}</Message>
    </ContentContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  removeNote: (item) => dispatch(removeNotification(item))
});

export default connect(null,mapDispatchToProps)(Notification);