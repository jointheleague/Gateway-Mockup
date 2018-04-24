import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileNav from './ProfileNav';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class UserTestimonial extends Component {
  constructor(props) {
    super(props);

    var testimonial = this.props.profile.testimonials[this.props.testimonialId];
    var profileID = testimonial.profileID;

    this.state = {
      text: testimonial.text
    };
  }

  render() {
    return(
      <Col md={4}>
        <Panel>
          <div className="panel-body" style={{height: 150 + "px"}}>
            {this.state.text}
            <br />
            <a href="#">-Teran Bo</a>
          </div>
        </Panel>
      </Col>
    );
  }
}
