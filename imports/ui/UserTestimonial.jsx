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
    var username = testimonial.username;

    this.state = {
      text: "",
      username: username
    };

    Meteor.call("profile.getFromUsername", username, (error, profile) => {
      this.setState({
        text: testimonial.text
      });
    });
  }

  render() {
    return(
      <Col md={4}>
        <Panel>
          <div className="panel-body" style={{height: 150 + "px"}}>
            {this.state.text}
            <br/>
            <a href={"/profile/" + this.state.username}> -{this.state.username}</a>
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
