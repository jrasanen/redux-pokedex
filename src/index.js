import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import pokemon from './reducers';
import Pokedex from './components/Pokedex';
import {App} from './components/App';

const preloadedState = window.__PRELOADED_STATE__

// Store
const store = createStore(pokemon, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
