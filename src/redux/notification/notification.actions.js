import notificationTypes from './notification.types';

export const pushNotification = note => ({
  type: notificationTypes.PUSH_NOTE,
  payload: note
})

export const removeNotification = note => ({
  type: notificationTypes.REMOVE_NOTE,
  payload: note
})