// @flow

import { createAction } from 'redux-actions'

export const SHARYN_FETCH_PAGE_REQUEST = 'SHARYN_FETCH_PAGE_REQUEST'
export const SHARYN_FETCH_PAGE_SUCCESS = 'SHARYN_FETCH_PAGE_SUCCESS'
export const SHARYN_FETCH_PAGE_FAILURE = 'SHARYN_FETCH_PAGE_FAILURE'
export const fetchPageRequest = createAction(SHARYN_FETCH_PAGE_REQUEST)
export const fetchPageSuccess = createAction(SHARYN_FETCH_PAGE_SUCCESS)
export const fetchPageFailure = createAction(SHARYN_FETCH_PAGE_FAILURE)

export const SHARYN_NAVIGATION = 'SHARYN_NAVIGATION'
export const navigation = createAction(SHARYN_NAVIGATION)

export const SHARYN_DISMISS_FIRST_NOTIFICATION = 'SHARYN_DISMISS_FIRST_NOTIFICATION'
export const dismissFirstNotification = createAction(SHARYN_DISMISS_FIRST_NOTIFICATION)

export const SHARYN_ASYNC_REQUEST = 'SHARYN_ASYNC_REQUEST'
export const SHARYN_ASYNC_SUCCESS = 'SHARYN_ASYNC_SUCCESS'
export const SHARYN_ASYNC_FAILURE = 'SHARYN_ASYNC_FAILURE'
export const asyncRequest = createAction(SHARYN_ASYNC_REQUEST)
export const asyncSuccess = createAction(SHARYN_ASYNC_SUCCESS)
export const asyncFailure = createAction(SHARYN_ASYNC_FAILURE)
