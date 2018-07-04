import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileEditText from '../ui/ProfileEditText';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ProfileNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <Col md={3}>
         <div className="panel panel-default">
    <div className="panel-body">
      <legend><h2><ProfileEditText username={this.props.profile.github} placeholder="John" fieldName="firstName" showFullPlaceholder={false}></ProfileEditText> <ProfileEditText username={this.props.profile.github} placeholder="Doe" fieldName="lastName" showFullPlaceholder={false}></ProfileEditText></h2></legend>
      <div style={{overflowWrap: "break-word"}}><ProfileEditText username={this.props.profile.github} placeholder="Bio" fieldName="bio" showFullPlaceholder={true} isParagraph={true}></ProfileEditText></div>
      <h4>Contact</h4>
      <div style={{color: "grey"}}>
        <ProfileEditText username={this.props.profile.github} placeholder="Email" fieldName="email" showFullPlaceholder={true}></ProfileEditText>
        <br/>
        <ProfileEditText username={this.props.profile.github} placeholder="Phone Number" fieldName="phoneNumber" showFullPlaceholder={true}></ProfileEditText>
        <br/>
        <a href={"https://github.com/" + this.props.profile.github}>{this.props.profile.github + " on GitHub"}</a>
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

ProfileNav.propTypes = {
  profile: PropTypes.object.isRequired
}
