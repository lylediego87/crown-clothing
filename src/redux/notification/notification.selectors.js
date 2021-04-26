import { createSelector } from 'reselect';

const selectNotifications = state => state.notifications;

export const selectItems = createSelector([selectNotifications], notifications => notifications.items);