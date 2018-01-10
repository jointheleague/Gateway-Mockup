import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';

import App from '../imports/ui/App.jsx';
import Homepage from '../imports/ui/Homepage.jsx';
import Dashboard from '../imports/ui/Dashboard.jsx';
import Profile from '../imports/ui/Profile.jsx';
import JobListings from '../imports/ui/JobListings.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import About from '../imports/ui/About.jsx';
import Login from '../imports/ui/Login.jsx'
import './main.html';

const history = createBrowserHistory();

Meteor.startup(() => {
	render(
		<Router history={history}>
			<App>
				<Route path="/" component={ Homepage } />
				<Route path="/dashboard" component={ Dashboard } />
				<Route path="/profile" component={ Profile } />
				<Route path="/jobs" component={ JobListings } />
				<Route path="/login" component={ Login } />
				<Route path="/about" component={ About } />
				<Route path="*" component={ NotFound } />                                                   
			</App>
		</Router>,
		document.getElementById('react-root')
	);
});
