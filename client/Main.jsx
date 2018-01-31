import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';
import { Accounts } from 'meteor/std:accounts-ui';

import App from '../imports/ui/App.jsx';
import Homepage from '../imports/ui/Homepage.jsx';
import Dashboard from '../imports/ui/Dashboard.jsx';
import Profile from '../imports/ui/Profile.jsx';
import JobListings from '../imports/ui/JobListings.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import About from '../imports/ui/About.jsx';
import Login from '../imports/ui/Login.jsx'
import SignUp from '../imports/ui/SignUp.jsx'
import PostaJob from '../imports/ui/PostaJob.jsx'
import './main.html';

const history = createBrowserHistory();


Meteor.startup(() => {
	Accounts.ui.config({
	  loginPath: '/login',
	  onSignedInHook: () => history.push('/dashboard'),
	  onSignedOutHook: () => history.push('/')
	});
	render(
		<Router history={history}>
			<App>
				<Route exact path="/" component={ Homepage } />
				<Route exact path="/dashboard" component={ Dashboard } />
				<Route exact path="/profile" component={ Profile } />
				<Route exact path="/jobs" component={ JobListings } />
				<Route exact path="/login" component={ Login } />
				<Route exact path="/about" component={ About } />
				<Route exact path="/signup" component={ SignUp } />
				<Route exact path="/jobs/edit" component={ PostaJob } />
			</App>
		</Router>,
		document.getElementById('react-root')
	);
});
