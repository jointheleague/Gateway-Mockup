import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';

import App from '../imports/ui/App.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import './main.html';

const history = createBrowserHistory();

Meteor.startup(() => {
  render( 
    <Router history={history}>
		<Switch>
        	<Route path="/" component={ App } />
       		<Route component={ NotFound } />
		</Switch>
    </Router>, 
    document.getElementById('react-root') 
  );
});