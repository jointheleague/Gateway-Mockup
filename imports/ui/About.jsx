import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Grid, Col, Panel } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <div>
        <Grid>
          <div style={{"fontSize": "18px"}}>
            <div style={{margin: "auto"}}>
              <h2> About </h2>
              <br />
            </div>
            <p>
              Project Gateway aims to provide students with practical experience through real-world coding jobs. Students of all skill levels can apply and complete jobs in a multitude of different languages
              posted by various clients. Students will recieve feedback for their work through various metrics and comments. Clients will not only be able to speed up their workflow through outsourcing
              parts of their project to eager students, but will also have the opportunity to provide valuable learning experiance to aspiring programmers.
            </p>
          </div>
          <br />
          <Panel>
            <div style={{"fontSize": "18px", margin: "auto", width: "50%"}}>
              <Col md={4}>
                <img src="images/computerIcon.svg" width="75px;" />
                <br />
                14 Coders
              </Col>
              <Col md={4}>
                <img src="images/workIcon.svg" width="75px;" />
                <br />
                8 Clients
              </Col>
              <Col md={4}>
                <img src="images/checkIcon.svg" width="75px;" />
                <br />
                24 Completed Jobs
              </Col>
            </div>
          </Panel>
        </Grid>
      </div>
    );
  }
}