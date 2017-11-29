import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ProfileNav extends Component {
  render() {
    return(
      
      <Col md={3}>
         <div className="panel panel-default">
    <div className="panel-body">
      <legend> <h2> John Doe </h2> </legend>
      <p>Here is an optional short bio... Hey look, this bio wraps onto the next line! Oh, and the next one too.</p>
      <h4> Contact </h4>
      <div style={{color: "grey"}}>
        john.doe@bestemailhosting.net
        <br/>
        1-234-567-7890
        <br/>
        github.com/johnDoe
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
