import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ProfileNav extends Component {
  constructor() {
    super();

    this.profile = this.profile.bind(this);
  }

  profile() {
    return Meteor.user().profile;
  }

  render() {
    return(

      <Col md={3}>
         <div className="panel panel-default">
    <div className="panel-body">
      <legend><h2>{this.profile().firstName + " " + this.profile().lastName}</h2></legend>
      <p>{this.profile().bio}</p>
      <h4>Contact</h4>
      <div style={{color: "grey"}}>
        {this.profile().email}
        <br/>
        {this.profile().phoneNumber}
        <br/>
        <a href={"https://github.com/" + this.profile().github}>{this.profile().github + " on GitHub"}</a>
      </div>
      <br/>
      <div className="container-fluid">
        <div className="row">
          <ul className="nav nav-pills nav-stacked">
            <li role="presentation" className="active"><a href="/profile">Profile</a></li>
            <li role="presentation"><a href="/profile">Profile</a></li>
            <li role="presentation" className="active"><a href="/profile/messages">Messages <span className="badge">4</span> </a></li>
            <li role="presentation"><a href="/profile/messages">Messages <span className="badge">4</span> </a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </Col>
    );
  }
}
