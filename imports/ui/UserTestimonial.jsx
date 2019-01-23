import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import '../rpc/ProfileRPC';
import {
	Col, Panel
} from 'react-bootstrap';

export default class UserTestimonial extends Component {
	constructor(props) {
		super(props);

		const testimonial = this.props.profile.testimonials[this.props.testimonialId];
		const username = testimonial.username;

		this.state = {
			text: '',
			username
		};

		Meteor.call('profile.getFromUsername', username, (error, profile) => {
			this.setState({
				text: testimonial.text
			});
		});
	}

	render() {
		return (
			<Col md={4}>
				<Panel>
					<div className="panel-body" style={{ height: `${150}px` }}>
						{this.state.text}
						<br />
						<a href={`/profile/${this.state.username}`}>
							{' '} - {this.state.username}
						</a>
					</div>
				</Panel>
			</Col>
		);
	}
}

UserTestimonial.propTypes = {
	profile: PropTypes.object,
	testimonialId: PropTypes.number
};
