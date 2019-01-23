import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Col
} from 'react-bootstrap';
import ProfileEditText from './ProfileEditText';

export default class ProfileNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO : IMPORTANT : Here we are assuming that their username is the same as their GitHub username. Find a better way to do this when we support multiple login options.
		return (
			<Col md={3}>
				<div className="panel panel-default">
					<div className="panel-body">
						<legend>
							<h2>
								<ProfileEditText isEditable={this.props.isMyProfile} username={this.props.profile.username} placeholder="First Name" fieldName="firstName" showFullPlaceholder={false} />
								{' '}
								<ProfileEditText isEditable={this.props.isMyProfile} username={this.props.profile.username} placeholder="Last Name" fieldName="lastName" showFullPlaceholder={false} />
							</h2>
						</legend>
						<div style={{ overflowWrap: 'break-word' }}><ProfileEditText isEditable={this.props.isMyProfile} username={this.props.profile.username} placeholder="Bio" fieldName="bio" showFullPlaceholder isParagraph /></div>
						<h4>Contact</h4>
						<div style={{ color: 'grey' }}>
							<ProfileEditText isEditable={this.props.isMyProfile} username={this.props.profile.username} placeholder="Email" fieldName="email" showFullPlaceholder />
							<br />
							<ProfileEditText isEditable={this.props.isMyProfile} username={this.props.profile.username} placeholder="Phone Number" fieldName="phoneNumber" showFullPlaceholder />
							<br />
							<a href={`https://github.com/${this.props.profile.username}`} target="_blank">{`${this.props.profile.username} on GitHub`}</a>
						</div>
						<br />
						<div className="container-fluid">
							<div className="row">
								<ul className="nav nav-pills nav-stacked" />
							</div>
						</div>
					</div>
				</div>
			</Col>
		);
	}
}

ProfileNav.propTypes = {
	profile: PropTypes.object.isRequired
};
