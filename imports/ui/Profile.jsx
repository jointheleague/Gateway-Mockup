import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
	Col, Panel, Grid, Row
} from 'react-bootstrap';
import ProfileNav from './ProfileNav';
import UserTestimonial from './UserTestimonial';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: null,
			profileExists: true,
			isMyProfile: false
		};

		Meteor.call('profile.getFromUsername', this.props.match.params.username, (error, profile) => {
			if (profile) {
				this.setState({
					profile
				});
				if (this.props.user) {
					if (this.props.user.profile.username === this.props.match.params.username) {
						this.setState({
							isMyProfile: true
						});
					}
				}
			} else {
				this.setState({
					profileExists: false
				});
			}
		});
	}

	render() {
		if (!this.state.profile) {
			if (this.state.profileExists) {
				return (
					<div>
						Loading...
					</div>
				);
			}
			return (
				<div>
					<div className="text-center">
						<h2> This user does not exist. </h2>
					</div>
				</div>
			);
		}
		const Testimonials = [];
		for (let i = 0; i < this.state.profile.testimonials.length; i++) {
			Testimonials.push(<UserTestimonial profile={this.state.profile} testimonialId={i} />);
		}
		return (
			<div>
				<Grid>
					<Row>
						<ProfileNav profile={this.state.profile} isMyProfile={this.state.isMyProfile} />
						<div className="col-md-3 offset-md-4" />
						<Col md={8}>
							<Panel>
								<Panel.Body>
									<Row>
										<Col md={6}>
											<Col mdOffset={1} md={10}>
												<legend><h3>Current Activity</h3></legend>
											</Col>
											<Col md={4}>
												<div className="center">
													<div className="currentText">
														<b>{this.state.profile.currentJobs}</b>
													</div>
													<a href="/jobs" className="blackColorLink">Current Jobs</a>
												</div>
											</Col>
											<Col md={4}>
												<div className="center">
													<div className="currentText">
														<b>{this.state.profile.completedJobs}</b>
													</div>
													<a href="/jobs" className="blackColorLink">Completed Jobs</a>
												</div>
											</Col>
											<Col md={4}>
												<div className="center">
													<div className="currentTextDisabled">
														<b>{this.state.profile.jobListings}</b>
													</div>
													<div href="/listings" className="blackColorLink">Job Listings</div>
												</div>
											</Col>
										</Col>
										<Col md={6}>
											<Col mdOffset={1} md={10}>
												<div className="center">
													<legend>
														{' '}
														<h3> User Ratings </h3>
														{' '}
													</legend>
												</div>
											</Col>
											<div style={{ fontSize: `${14}px` }}>
												<Col md={4}>
													<div className="center">
														<div className="currentText">{this.state.profile.experience}</div>
															Experience
													</div>
												</Col>
												<Col md={4}>
													<div className="center">
														<div className="currentText">{this.state.profile.workQuality}</div>
															Work Quality
													</div>
												</Col>
												<Col md={4}>
													<div className="center">
														<div className="currentText">{this.state.profile.timeliness}</div>
															Timeliness
													</div>
												</Col>
											</div>
										</Col>
									</Row>
									<br />
									<div className="center">
										<h3> User Testimonials </h3>
									</div>
									<br />
									<Row>
										{Testimonials.length > 0 ? Testimonials : <div className="text-center"> This user has not yet displayed any testimonials </div>}
									</Row>
								</Panel.Body>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
