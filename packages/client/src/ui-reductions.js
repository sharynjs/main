// @flow

import curryRight from 'lodash.curryright'

export const activateLoading = (uiState: Object) => ({ ...uiState, isLoading: true })
export const deactivateLoading = (uiState: Object) => ({ ...uiState, isLoading: false })

export const addOneNotification = curryRight((uiState: Object, notification?: Object) => ({
  ...uiState,
  notifications: uiState.notifications.concat(
    ...(notification
      ? [typeof notification === 'string' ? { message: notification } : notification]
      : []),
  ),
}))

export const addMultipleNotifications = curryRight(
  (uiState: Object, notifications?: Object[] = []) => ({
    ...uiState,
    notifications: uiState.notifications.concat(
      notifications.map(
        notification =>
          typeof notification === 'string' ? { message: notification } : notification,
      ),
    ),
  }),
)

export const removeFirstNotification = (uiState: Object) => ({
  ...uiState,
  notifications: uiState.notifications.splice(1),
})
