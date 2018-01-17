import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

export default class SignUp extends Component {

  constructor(){
    console.log("Constructor");
    super();
    this.handleUsername1 = this.handleUsername1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      usernamePlaceholder: 'Pick a username'
    };
    console.log(this.state);
  }

  handleUsername1(e){
    console.log("handleChange");
    this.setState({ username: e.target.value});
    console.log(this.state);
  }

  handleSubmit(e){
    if (this.state.username == '') this.setState({ usernamePlaceholder : 'You must enter a username.'});
  }

  render(){
    return(
      <div>
        <AppNavbar username="lucas.baizer"></AppNavbar>
        <Grid>
          <br />
            <Row>
                <center><img src="images/gate.png" alt="..." width={100} height={100}/></center>
            </Row>
            <br />
            <Row>
              <center><h3>Sign up for Gateway</h3></center>
            </Row>
            <br />
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
                        placeholder = {this.state.usernamePlaceholder}
                        onChange = {this.handleUsername1}
                        value = {this.state.username}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup
                      controlId="formBasicText"
                      >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder = "you@example.com"
                        />
                        <FormControl.Feedback />
                      </FormGroup>
                      <FormGroup
                        controlId="formBasicText"
                        >
                          <ControlLabel>Confirm Email</ControlLabel>
                          <FormControl
                            type="text"
                            placeholder = "Reenter email"
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                    <FormGroup
                      controlId="formBasicText"
                      >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder = "Create a password"
                        />
                        <FormControl.Feedback />
                      </FormGroup>
                      <FormGroup
                        controlId="formBasicText"
                        >
                          <ControlLabel>Confirm Password</ControlLabel>
                          <FormControl
                            type="text"
                            placeholder = "Reenter password"
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      <Button bsStyle="primary" onClick={this.handleSubmit}>Sign up for Gateway</Button>
                    </form>
                  </Panel>
                  <Panel>
                    <p>Already have an account?</p>
                    <a href = "/login">Log in.</a>
                  </Panel>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }

    }
