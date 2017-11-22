import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Profile extends Component {
  render() {
    return(
      <Grid>
        <Row>
          <div class="col-md-3 offset-md-4">
            {{>profileNav}}
          </div>
          <Col md={8}>
            <Panel>
              <Row>
                <Col md={6}>
                  <Col mdOffset={1} md={10}>
                    <legend><h3>Current Activity</h3></legend>
                  </Col>
                  <Col md={4}>
                    <div class="center">
                      <div class="currentText">
                        <b>4</b>
                      </div>
                      <a href="/jobs" class="blackColorLink">Current Jobs</a>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div class="center">
                      <div class="currentText">
                        <b>8</b>
                      </div>
                      <a href="/jobs" class="blackColorLink">Completed Jobs</a>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div class="center">
                      <div class="currentTextDisabled">
                        <b> 0 </b>
                      </div>
                      <div href="/listings" class="blackColorLink">Job Listings</div>
                    </div>
                  </Col>
                </Col>
                <Col md={6}>
                  <Col mdOffset={1} md={10}>
                    <div class="center">
                      <legend> <h3> User Ratings </h3> </legend>
                    </div>
                  </Col>
                  <div style="font-size:14px;">
                    <Col md={4}>
                      <div class="center">
                        <div class="currentText">5.0</div>
                        Experience
                      </div>
                    </Col>
                    <Col md={4}>
                      <div class="center">
                        <div class="currentText">4.1</div>
                        Work Quality
                      </div>
                    </Col>
                    <Col md={4}>
                      <div class="center">
                        <div class="currentText">2.9</div>
                        Timeliness
                      </div>
                    </Col>
                  </div>
                </Col>
              </Row>

              <br />

              <div class="center">
                <h3> User Testimonials </h3>
              </div>
              <br />
              <div class="row">
                <div class="col-md-4">
                  <div class="panel panel-default">
                    <div class="panel-body" style="height:150px;">
                      "All I needed was a for loop, but gee did he write that for loop well. Super optimized. 10/10 would hire again." <br /> <a href="#"> -Teran Bo </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="panel panel-default">
                    <div class="panel-body" style="height:150px;">
                      "This guy found a way to implement bubble sort in O(-1). My computer ran backwards." <br /> <a href="#"> -Khan Toe </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="panel panel-default">
                    <div class="panel-body" style="height:100%;">
                      "Best Git Commit Messages" <br /> <a href="#"> -Ron Moe </a><br /><br /><br /><br />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}
