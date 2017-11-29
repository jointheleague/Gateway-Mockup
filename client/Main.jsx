import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';

import App from '../imports/ui/App.jsx';
import Dashboard from '../imports/ui/Dashboard.jsx';
import Profile from '../imports/ui/Profile.jsx';
import JobListings from '../imports/ui/JobListings.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import './main.html';

const history = createBrowserHistory();

Meteor.startup(() => {
	render(
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={ App } />
				<Route exact path="/dashboard" component={ Dashboard } />
				<Route exact path="/profile" component={ Profile } />
				<Route exact path="/jobs" component={ JobListings } />
				<Route path="*" component={ NotFound } />
			</Switch>
		</Router>, 
		document.getElementById('react-root') 
	);
});