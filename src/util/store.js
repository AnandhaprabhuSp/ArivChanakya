// import {
//     compose,
//     applyMiddleware,
//     createStore
// } from 'redux'
import { createStore,applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import allReducers from '../reducers/index'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, allReducers)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
export default store = createStore(persistedReducer,applyMiddleware(thunk, logger));
export const  persistor = persistStore(store)