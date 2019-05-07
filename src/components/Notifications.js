// @flow

import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import withState from 'recompose/withState'

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
  ...props
}: {
  notifications?: Object[],
  handleDismissNotification: Function,
  currentSnackbar?: Object,
  isOpen: boolean,
  updateIsOpen: Function,
}) => {
  const [currentSnackbar] = notifications
  if (currentSnackbar) {
    const { mainAction, dismissable = true, keepClickAway, ...muiProps } = currentSnackbar
    const actions = mainAction
      ? [
          // eslint-disable-next-line
          <div key="main" role="button" onClick={() => handleClose(updateIsOpen, keepClickAway)}>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
