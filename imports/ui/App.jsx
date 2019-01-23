import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Route } from 'react-router';
import AppNavbar from './AppNavbar';
import Homepage from './Homepage.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import JobListings from './JobListings.jsx';
import About from './About.jsx';
import SignUp from './SignUp.jsx';
import PostaJob from './PostaJob.jsx';
import JobDetails from './JobDetails.jsx';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<AppNavbar profile={this.props.profile || { github: 'Logged Out' }} />

				<Route exact path="/" component={Homepage} />
				<Route exact path="/profile/:username" render={props => <Profile {...props} user={this.props.user} />} />
				<Route exact path="/job/:jobName" render={props => <JobDetails {...props} user={this.props.user} />} />
				<Route exact path="/dashboard" render={props => <Dashboard {...props} user={this.props.user} />} />
				<Route exact path="/jobs" component={JobListings} />
				<Route exact path="/login" component={SignUp} />
				<Route exact path="/about" component={About} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/jobs/edit" component={PostaJob} />
			</div>
		);
	}
}

App.propTypes = {
	user: PropTypes.object,
	profile: PropTypes.object
};

export default withTracker(() => ({
	user: (Meteor.user() || null) == null ? null : Meteor.user(),
	profile: (Meteor.user() || null) == null ? null : Meteor.user().profile
}))(App);
