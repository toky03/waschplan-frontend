import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore, applyMiddleware } from 'redux'
import combineReducers from './state/reducer'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { composeWithDevTools } from 'redux-devtools-extension'
import { CombinedState } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

// Das any hier zu ersetzten wäre mir relativ viel Aufwand verbunden und deshalb reicht hier CombinedState
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: CombinedState<any>

if (process.env.NODE_ENV === 'development') {
    store = createStore(
        combineReducers,
        composeWithDevTools(applyMiddleware(thunk))
    )
} else {
    store = createStore(combineReducers, applyMiddleware(thunk))
}

export default store

export type AppDispatch = typeof store.dispatch

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()
