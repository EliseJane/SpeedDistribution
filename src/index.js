import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import RouteApp from './RouteApp';
import SpeedApp from './SpeedApp';
import registerServiceWorker from './registerServiceWorker';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/all' component={SpeedApp} />
      <Route path='/' component={RouteApp} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
