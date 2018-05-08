import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileNav from './ProfileNav';
import UserTestimonial from './UserTestimonial';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    };

    Meteor.call("profile.getFromGithub", this.props.match.params.username, (error, profile) => {
      this.setState({
        profile: profile
      });
    });
  }

  render() {
    if(!this.state.profile) {
      return(
        <div>
          Loading...
        </div>
      );
    } else {
      return(
        <div>
        <Grid>
          <Row>
          <ProfileNav profile={this.state.profile}> </ProfileNav>
            <div className="col-md-3 offset-md-4">
            </div>
            <Col md={8}>
              <Panel>
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
                        <legend> <h3> User Ratings </h3> </legend>
                      </div>
                    </Col>
                    <div style={{fontSize: 14 + "px"}}>
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
                <div className="row">
                  <UserTestimonial profile={this.state.profile} testimonialId={0}></UserTestimonial>
                  <UserTestimonial profile={this.state.profile} testimonialId={1}></UserTestimonial>
                  <UserTestimonial profile={this.state.profile} testimonialId={2}></UserTestimonial>
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
        </div>
      );
    }
  }
}
