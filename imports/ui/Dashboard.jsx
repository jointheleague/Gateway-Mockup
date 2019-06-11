import React, { Component } from 'react';
import {
	Col, Panel, Grid, Row, ListGroup, ListGroupItem, Modal, Button
} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDirectMessages: true,
			showJobComments: true,
			showJobApplicants: true,
			showCodeSubmissions: true,
			showOther: true,
			showJobApplicationModal: false,
			currentApplication: null
		};
		this.toggleFilter = this.toggleFilter.bind(this);
		this.handleViewJobApplication = this.handleViewJobApplication.bind(this);
		this.handleJobApplicationModalClose = this.handleJobApplicationModalClose.bind(this);
		this.handleAcceptJobApplication = this.handleAcceptJobApplication.bind(this);
	}

	toggleFilter(filterName) {
		this.setState({
			[filterName]: !this.state[filterName]
		});
	}

	handleViewJobApplication(application) {
		Meteor.call('job.getApplication', application.job, application.applicant, (_error, job) => {
			this.setState({
				showJobApplicationModal: true,
				currentApplication: job.application
			});
		});
	}

	handleJobApplicationModalClose() {
		this.setState({
			showJobApplicationModal: false,
			currentApplication: null
		});
	}

	handleAcceptJobApplication() {
		this.setState({
			showJobApplicationModal: false
		});
	}

	render() {
		const Notifications = [];
		if (this.props.user != undefined) {
			this.props.user.profile.notifications.sort((a, b) => b.date.getTime() - a.date.getTime());
			for (let i = 0; i < this.props.user.profile.notifications.length; i++) {
				const notification = this.props.user.profile.notifications[i];
				if(notification.viewed) {
					continue;
				}

				if(notification.type === 'newApplicant' && this.state.showJobApplicants) {
					Notifications.push(
						<Panel bsStyle="success" key={i}>
							<Panel.Heading>
								<Panel.Title componentClass="h3">
									New Applicant For
									{' '}
									<b><a href={`/job/${encodeURIComponent(notification.job)}`}>{notification.job}</a></b>
								</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<a href={`/profile/${notification.applicant}`}>{notification.applicant}</a>
								{' '}
								has applied to work on your job.
								<Button className="pull-right" bsStyle="success" onClick={() => this.handleViewJobApplication(notification)}>View Application</Button>
							</Panel.Body>
						</Panel>,
					);
				} else if(notification.type === 'newComment' && this.state.showJobComments) {
					Notifications.push(
						<Panel bsStyle="info" key={i}>
							<Panel.Heading>
								<Panel.Title componentClass="h3">
									New Question About
									{' '}
									<b><a href={`/job/${encodeURIComponent(notification.job)}`}>{notification.job}</a></b>
								</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								{(() => {
									if(notification.text.length <= 60) {
										return notification.text;
									}
									return notification.text.substring(0, notification.text.indexOf(' ', 60)) + '...';
								})()}
								{' '}
								<a href={`/profile/${notification.username}`}>
									-
									{notification.username}
								</a>
								{' '}
								<Button className="pull-right" bsStyle="primary" href={`/job/${encodeURIComponent(notification.job)}`}>Respond</Button>
							</Panel.Body>
						</Panel>,
					);
				}
			}
		}
		return (
			<div>
				<Grid>
					<Row>
						<Col md={3}>
							<h2>Filters</h2>
							<ListGroup>
								<ListGroupItem active={this.state.showDirectMessages} disabled={!this.state.showDirectMessages} onClick={() => { this.toggleFilter('showDirectMessages'); }}>Direct Messages</ListGroupItem>
								<ListGroupItem active={this.state.showJobComments} disabled={!this.state.showJobComments} onClick={() => { this.toggleFilter('showJobComments'); }}>Job Questions</ListGroupItem>
								<ListGroupItem active={this.state.showJobApplicants} disabled={!this.state.showJobApplicants} onClick={() => { this.toggleFilter('showJobApplicants'); }}>Job Applicants</ListGroupItem>
								<ListGroupItem active={this.state.showCodeSubmissions} disabled={!this.state.showCodeSubmissions} onClick={() => { this.toggleFilter('showCodeSubmissions'); }}>Code Submissions</ListGroupItem>
								<ListGroupItem active={this.state.showOther} disabled={!this.state.showOther} onClick={() => { this.toggleFilter('showOther'); }}>Other</ListGroupItem>
							</ListGroup>
						</Col>
						<Col md={9}>
							<h2>Notifications</h2>
							{Notifications}
						</Col>
					</Row>
				</Grid>
				<Modal show={this.state.showJobApplicationModal}>
					<Modal.Header closeButton>
						<Modal.Title>View Job Application</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Job Application</h4>
						<p>{this.state.currentApplication}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleJobApplicationModalClose}>Close</Button>
						<Button bsStyle="success" onClick={this.handleAcceptJobApplication}>Accept For Job</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
