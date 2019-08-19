// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import withState from 'recompose/withState'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const handleClose = (updateIsOpen, keepClickAway, reason) => {
  if (keepClickAway || reason !== 'clickaway') {
    updateIsOpen(false)
  }
}

const handleExited = (updateIsOpen, handleDismissNotification) => {
  handleDismissNotification()
  updateIsOpen(true)
}

const NotificationsJSX = ({
  notifications = [],
  handleDismissNotification,
  isOpen,
  updateIsOpen,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  ...props
}: {
  notifications?: Object[],
  handleDismissNotification: Function,
  currentSnackbar?: Object,
  isOpen: boolean,
  updateIsOpen: Function,
  anchorOrigin?: Object,
}) => {
  const currentSnackbar = notifications[0]
  if (currentSnackbar) {
    const {
      mainAction,
      dismissable = true,
      dismissOnMainAction = true,
      keepClickAway,
      ...muiProps
    } = currentSnackbar
    const actions = mainAction
      ? [
          // eslint-disable-next-line
          <div
            key="main"
            role="button"
            onClick={() => dismissOnMainAction && handleClose(updateIsOpen, keepClickAway)}
          >
            {mainAction}
          </div>,
        ]
      : []
    if (dismissable) {
      actions.push(
        <IconButton
          key="dismiss"
          color="inherit"
          onClick={() => handleClose(updateIsOpen, keepClickAway)}
        >
          <CloseIcon />
        </IconButton>,
      )
    }
    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={isOpen}
        onClose={(e, reason) => handleClose(updateIsOpen, keepClickAway, reason)}
        onExited={() => handleExited(updateIsOpen, handleDismissNotification)}
        autoHideDuration={6000}
        action={actions}
        {...muiProps}
        {...props}
      />
    )
  }
  return null
}

const Notifications = withState('isOpen', 'updateIsOpen', true)(NotificationsJSX)

export default Notifications
