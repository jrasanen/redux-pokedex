import qs from 'qs'
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import pokemon from './src/reducers';
import {App} from './src/components/App';
import {mockData} from './src/constants';

const app = Express()
const port = 3000

app.use('/public', Express.static(path.join(__dirname + '/public')));
app.use(handleRender)

function handleRender(req, res) {
  const params = qs.parse(req.query)
  let preloadedState = { pokemon: mockData, errors: [], visibilityFilter: "All" }
  const store = createStore(pokemon, preloadedState)
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const finalState = store.getState()
  res.send(renderFullPage(html, finalState))
}

function renderFullPage(html, preloadedState) {
  return `<html>
  	<head>
      <meta charset="UTF-8">
  		<title>pokedex</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <style>
        body {
          margin-top: 2rem;
        }
        .newEntryForm {
          padding-top: 1rem;
        }
        .pokemon__item {
          padding-top: 1rem;
          padding-bottom: 2rem;
        }
      </style>
  	</head>
  	<body><script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
    </script>
      <div class="container">
        <div class="row">
  		    <div id="root" class="col-md-12">${html}</div>
        </div>
      </div>
  		<script type="text/javascript" src="/public/bundle.js"></script>
  	</body>
  </html>
    `
}

app.listen(port)
