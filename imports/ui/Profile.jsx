import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GatewayComponent from './GatewayComponent';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileNav from './ProfileNav';
import UserTestimonial from './UserTestimonial';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Profile extends GatewayComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.getProfile()) {
      return (
        <div>
          Please sign in to access your profile.
        </div>
      );
    }
    return(
      <div>
      <Grid>
        <Row>
        <ProfileNav profile={this.getProfile()}> </ProfileNav>
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
                        <b>{this.getProfile().currentJobs}</b>
                      </div>
                      <a href="/jobs" className="blackColorLink">Current Jobs</a>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="center">
                      <div className="currentText">
                        <b>{this.getProfile().completedJobs}</b>
                      </div>
                      <a href="/jobs" className="blackColorLink">Completed Jobs</a>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="center">
                      <div className="currentTextDisabled">
                        <b>{this.getProfile().jobListings}</b>
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
                        <div className="currentText">{this.getProfile().experience}</div>
                        Experience
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="center">
                        <div className="currentText">{this.getProfile().workQuality}</div>
                        Work Quality
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="center">
                        <div className="currentText">{this.getProfile().timeliness}</div>
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
                <UserTestimonial profile={this.getProfile()} testimonialId={0}></UserTestimonial>
                <UserTestimonial profile={this.getProfile()} testimonialId={1}></UserTestimonial>
                <UserTestimonial profile={this.getProfile()} testimonialId={2}></UserTestimonial>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}
