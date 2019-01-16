import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Accounts } from 'meteor/accounts-base';

import App from '../imports/ui/App.jsx';
import './main.html';

const history = createBrowserHistory();


Meteor.startup(() => {
	Accounts.config({
		forbidClientAccountCreation: false
	});
	Accounts.onLogin((data) => {
		const toRedirect = `/profile/${Meteor.user.username}`;
	});


	render(
		<Router history={history}>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</Router>,
		document.getElementById('react-root'),
	);
});
