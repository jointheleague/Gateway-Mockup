import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

export default class Login extends Component {

  render(){
    return(
      <div>
        <AppNavbar username="lucas.baizer"></AppNavbar>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              <Panel>
            <form>
              <FormGroup
                controlId="formBasicText"
                >
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder = "Username"
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                  >
                    <ControlLabel>Password</ControlLabel>
                    <a href="/forgotPW">Forgot password?</a>
                    <FormControl
                      type="text"
                      placeholder = "Password"
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <a href="/profile"><Button bsStyle="primary">Sign in</Button></a>
              </form>
            </Panel>
            <Panel>
              <p>New to Gateway?</p>
              <a href = "/signup">Create an account.</a>
            </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }

  }
