/**
 * @file Root React component.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import PageEditorComponent from './components/PageEditorComponent.jsx';

import './main.scss';

import { rootReducer } from './store/reducers.js';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/page/:id" component={PageEditorComponent} />
        <Route path="/page" component={PageEditorComponent} />
        <Route path="/" component={PageEditorComponent} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
