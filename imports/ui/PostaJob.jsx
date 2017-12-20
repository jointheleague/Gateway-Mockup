import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

export default class PostaJob extends Component {

  render(){
    return(
      <div>
        <AppNavbar username="lucas.baizer"></AppNavbar>
        <Grid>
          <br />
          <Row>
            <center><h3>New Job</h3></center>
          </Row>
          <br />
          <Row>
            <Col md={6} mdOffset={3}>
              <Panel>
                <form>
                  <FormGroup
                    controlId="formBasicText"
                    >
                      <ControlLabel>Job Title</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder = "Job Title"
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Job description</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Enter job details here" />
                    </FormGroup>
                    <a href="/profile"><Button bsStyle="primary">Create Job</Button></a>
                  </form>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }

  }
