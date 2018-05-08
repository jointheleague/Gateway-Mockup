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
      user: "",
      github: ""
    };

    Meteor.call("profile.getFromID", profileID, (error, profile) => {
      this.setState({
        text: testimonial.text,
        user: profile ? (profile.firstName + " " + profile.lastName) : "Unknown",
        github: profile ? profile.github : "Unknown"
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
            <a href={"/profile/" + this.state.github}>{this.state.user}</a>
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
