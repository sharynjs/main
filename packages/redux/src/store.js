// @flow

// flow-disable-next-line
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
// flow-disable-next-line
import thunk from 'redux-thunk'

import asyncReducer from './async-reducer'
import envReducer from './env-reducer'
import dataReducer from './data-reducer'

const createSharynStore = (options?: { preloadedState?: Object, isDevEnv?: boolean }) => {
  const composeEnhancers =
    (options?.isDevEnv && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const composedEnhancers = composeEnhancers(applyMiddleware(thunk))

  return createStore(
    combineReducers({
      async: asyncReducer,
      data: dataReducer,
      env: envReducer,
      ui: (s = {}) => s,
      user: (s = null) => s,
    }),
    options?.preloadedState ?? composedEnhancers,
    options?.preloadedState ? composedEnhancers : undefined,
  )
}

export default createSharynStore