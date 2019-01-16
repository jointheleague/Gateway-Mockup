import React, { Component } from 'react';
import {
	Col, Panel, Grid, Row, ListGroup, ListGroupItem, Modal, Button
} from 'react-bootstrap';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDirectMessages: true,
			showJobComments: true,
			showJobApplicants: true,
			showCodeSubmissions: true,
			showOther: true,
			showJobApplicationModal: false
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

	handleViewJobApplication() {
		this.setState({
			showJobApplicationModal: true
		});
	}

	handleJobApplicationModalClose() {
		this.setState({
			showJobApplicationModal: false
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
			for (let i = 0; i < this.props.user.profile.notifications.length; i++) {
				const notification = this.props.user.profile.notifications[i];
				switch (notification.type) {
				case 'newApplicant' && this.state.showJobApplicants:
					Notifications.push(
						<Panel bsStyle="success" key={i}>
							<Panel.Heading>
								<Panel.Title componentClass="h3">New Job Applicant</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<a href={`/profile/${notification.applicant}`}>{notification.applicant}</a>
								{' '}
								has applied to work on
								<a href={`/job/${encodeURIComponent(notification.jobName)}`} target="_blank">{notification.jobName}</a>
								{' '}
								<Button className="pull-right" bsStyle="success" onClick={this.handleViewJobApplication}>View Application</Button>
							</Panel.Body>
						</Panel>,
					);
					break;
				case 'newComment' && this.state.showJobComments:
					Notifications.push(
						<Panel bsStyle="info" key={i}>
							<Panel.Heading>
								<Panel.Title componentClass="h3">
									New Question About
									{notification.jobName}
								</Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								{notification.text}
								{' '}
								<a href={`/profile/${notification.username}`}>
									-
									{notification.username}
								</a>
								{' '}
								<Button className="pull-right" bsStyle="primary">Respond</Button>
							</Panel.Body>
						</Panel>,
					);
					break;
				default:
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
								<ListGroupItem active={this.state.showJobComments} disabled={!this.state.showJobComments} onClick={() => { this.toggleFilter('showJobComments'); }}>Job Comments</ListGroupItem>
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
						<p>In the future, clients will be able to view the applicant's "Job Application" on this page.</p>
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
