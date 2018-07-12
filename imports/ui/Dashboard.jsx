import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDirectMessages : true,
      showJobComments : true,
      showJobApplicants : true,
      showCodeSubmissions : true,
      showOther : true
    };
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  toggleFilter(filterName){
    this.setState({
      filterName : !this.state.filterName
    });
  }
  render() {
    const Notifications = [];
    if(this.props.user != undefined){
    for(var i = 0; i < this.props.user.profile.notifications.length; i++){
      notification = this.props.user.profile.notifications[i];
      Notifications.push(
        <Panel>
        {notification.title}
        </Panel>
      )
    }
  }
    return(
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <h2>Filters</h2>
              <ListGroup>
                <ListGroupItem active={this.state.showDirectMessages} disabled={!this.state.showDirectMessages}>Direct Messages</ListGroupItem>
                <ListGroupItem active={this.state.showJobComments} disabled={!this.state.showJobComments}>Job Comments</ListGroupItem>
                <ListGroupItem active={this.state.showJobApplicants} disabled={!this.state.showJobApplicants}>Job Applicants</ListGroupItem>
                <ListGroupItem active={this.state.showCodeSubmissions} disabled={!this.state.showCodeSubmissions}>Code Submissions</ListGroupItem>
                <ListGroupItem active={this.state.showOther} disabled={!this.state.showOther}>Other</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={9}>
              <h2>Notifications</h2>
              <Panel>
              {Notifications}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
