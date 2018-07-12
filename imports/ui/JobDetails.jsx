import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";
import AppNavbar from "./AppNavbar";
import LanguageSearch from "./LanguageSearch";
import { withTracker } from "meteor/react-meteor-data";
import {
	Col,
	Panel,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	InputGroup,
	Label,
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	Modal
} from "react-bootstrap";

// Get the Collection
import Jobs from '../api/Jobs';

export default class JobDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			job : undefined,
			showApplyModal : false,
			commentField : ""
		};

		Meteor.call("job.getFromName", this.props.match.params.jobName, (error, job) => {
			console.log(job);
			this.setState({
				job : job
			});
		});

		this.handleApplyModalClose = this.handleApplyModalClose.bind(this);
		this.handleApplyModalSubmit = this.handleApplyModalSubmit.bind(this);
		this.handleApplyModalOpen = this.handleApplyModalOpen.bind(this);
		this.handleCommentFieldChange = this.handleCommentFieldChange.bind(this);
		this.handlePostComment = this.handlePostComment.bind(this);
}
handleCommentFieldChange(e){
		this.setState({
			commentField : e.target.value
		});
}
handlePostComment(e){
	Meteor.call("job.postComment", this.props.match.params.jobName, this.state.commentField, (error) => {
		Meteor.call("job.getFromName", this.props.match.params.jobName, (error, job) => {
			this.setState({
				job : job
			});
		});
	});
}
handleApplyModalClose(){
	this.setState({
		showApplyModal : false
	});
}
handleApplyModalSubmit(){
	Meteor.call("job.apply", this.props.match.params.jobName, (error, job) => {
		this.setState({
			showApplyModal : false
		});
		Meteor.call("job.getFromName", this.props.match.params.jobName, (error, job) => {
			this.setState({
				job : job
			});
		});
	});
}
handleApplyModalOpen(){
	this.setState({
		showApplyModal : true
	});
}

	render() {
		if(this.state.job == undefined){
			return (
				<div> Loading... </div>
			);
		}else{
			const alreadyApplied = false;
			if(!(this.props.user == undefined)){
			for(var i = 0; i < this.state.job.applicants.length; i++){
				if(this.props.user.profile.username == this.state.job.applicants[i].username){
					alreadyApplied = true;
				}
			}
		}
			const jobComments = [];
			for(var i = 0; i < this.state.job.comments.length; i++){
					jobComments.push(<ListGroupItem>
					{this.state.job.comments[i].text}
					<br/>
					<a href={"/profile/" + this.state.job.comments[i].username}> -{this.state.job.comments[i].username}</a>
				</ListGroupItem>);
			}
		return (
			<div>
			<Grid>
				<Col md={3}>
					<Panel>
						<div className="panel-body">
						<Row>
							<h2>{this.state.job.name}</h2>
						</Row>
						<Row>
							{this.state.job.desc}
						</Row>
						<Row>
							<br/>
							{alreadyApplied ?
							(<div style={{fontSize : '20'}}> Applied <img src="/images/checkmark.png" width="20px;"/></div>)
							:
							(<Button bsStyle="success" onClick={this.handleApplyModalOpen}>Apply For Job</Button>)
							}
						</Row>
					</div>
					</Panel>
				</Col>
				<Col md={9}>
				<Row>
					<h2>Questions</h2>
					<Row>
  						<ListGroup>
								{jobComments}
							</ListGroup>
					</Row>
					<FormGroup controlId="formControlsTextarea">
      			<ControlLabel>Post A Question</ControlLabel>
      			<FormControl onChange={this.handleCommentFieldChange} componentClass="textarea" placeholder="" />
						<br/>
						<Button onClick={this.handlePostComment} bsStyle="primary">Ask Question</Button>
    			</FormGroup>
				</Row>
				</Col>
			</Grid>
			<Modal show={this.state.showApplyModal}>
				<Modal.Header closeButton>
					<Modal.Title>Apply for {this.state.job.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Job Application</h4>
					<p>
						In the future, users may be required to fill out a simple "Job Application" on this page. For now, all that is required is to click the Apply button.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleApplyModalClose}>Close</Button>
					<Button bsStyle="success" onClick={this.handleApplyModalSubmit}>Apply</Button>
				</Modal.Footer>
			</Modal>
		</div>
		);
	}
	}
}
