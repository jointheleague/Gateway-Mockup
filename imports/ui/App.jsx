import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import HomepageCarousel from './HomepageCarousel';
import Profile from './Profile';
import { Col, Panel, Jumbotron, Grid, Row, PageHeader, Button } from 'react-bootstrap';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(!this.props.user) {
			return(
				<div>
					Loading...
				</div>
			)
		}

		const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, {
			user: this.props.user,
			profile: this.props.profile
		}));

		console.log(childrenWithProps);

		return(
			<div>
				<AppNavbar username={(this.props.user != null ? this.props.user.username : "Logged Out")}></AppNavbar>
				<Profile profile={this.props.profile}></Profile>
			</div>
		);
	}
}

App.propTypes = {
	user: PropTypes.object,
	profile: PropTypes.object
}

export default withTracker(() => {
	return {
		user: Meteor.user() || null,
		profile: (Meteor.user() || null) == null ? null : Meteor.user().profile
	}
})(App);
