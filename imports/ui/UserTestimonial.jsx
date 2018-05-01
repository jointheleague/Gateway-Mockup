import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileNav from './ProfileNav';
import '../rpc/ProfileRPC';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class UserTestimonial extends Component {
  constructor(props) {
    super(props);

    var testimonial = this.props.profile.testimonials[this.props.testimonialId];
    var profileID = testimonial.profileID;

    this.state = {
      text: "",
      user: ""
    };

    var profile = Meteor.call("profile.getProfile", profileID, (error, profile) => {
      var user;
      if(profile) {
        user = profile.firstName + " " + profile.lastName;
      } else {
        user = "Unknown";
      }
      this.setState({
        text: testimonial.text,
        user: user
      });
    });
  }

  render() {
    return(
      <Col md={4}>
        <Panel>
          <div className="panel-body" style={{height: 150 + "px"}}>
            {this.state.text}
            <br />
            <a href="#">{this.state.user}</a>
          </div>
        </Panel>
      </Col>
    );
  }
}

UserTestimonial.propTypes = {
  profile: PropTypes.object,
  testimonialId: PropTypes.number
}
