import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Accounts } from 'meteor/std:accounts-ui';

import App from '../imports/ui/App.jsx';
import './main.html';

const history = createBrowserHistory();

Meteor.startup(() => {
	Accounts.config({
  forbidClientAccountCreation: false
});
	Accounts.ui.config({
	  loginPath: '/login',
		profilePath: '/dashboard',
		passwordSignupFields: 'USERNAME_AND_EMAIL',
	  onSignedInHook: () => history.push('/dashboard'),
	  onSignedOutHook: () => history.push('/logout')
	});

	render(
		<Router history={history}>
			<Switch>
				<Route path="/" component={ App } />
			</Switch>
		</Router>,
		document.getElementById('react-root')
	);
});
