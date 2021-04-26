import React from 'react';
import { connect } from 'react-redux';
import { selectItems } from '../../redux/notification/notification.selectors';

import { Container } from './notification-container.styles';
import Notification from '../notification/notification.component';

const NotificationsContainer = ({notes}) => {
  return(
    <Container>
      {
        notes.map(n => <Notification note={n} key={n.id} level={n.level} />)
      }
    </Container>
  )
}

const mapStateToProps = state => ({
  notes: selectItems(state)
}) 
export default connect(mapStateToProps)(NotificationsContainer);