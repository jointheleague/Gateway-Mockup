import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

export default class SignUp extends Component {

  constructor(){
    super();
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail1 = this.handleEmail1.bind(this);
    this.handleEmail2 = this.handleEmail2.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      usernamePlaceholder: 'Pick a username',
      email1: '',
      email1Placeholder: 'you@example.com',
      email2: '',
      email2Placeholder: 'Reenter email',
      password1: '',
      password1Placeholder: 'Create a password',
      password2: '',
      password2Placeholder: 'Reenter password',
      validationState1: null,
      validationState2: null,
      validationState3: null
    };
  }

  handleUsername(e){
    this.setState({ username: e.target.value});
  }

  handleEmail1(e){
    this.setState({ email1: e.target.value});
  }

  handleEmail2(e){
    this.setState({ email2: e.target.value});
  }

  handlePassword1(e){
    this.setState({ password1: e.target.value});
  }

  handlePassword2(e){
    this.setState({ password2: e.target.value});
  }

  handleSubmit(e){
    if (this.state.username == '') this.setState({
      usernamePlaceholder : 'You must enter a username.',
      validationState1: 'error'});
    else this.setState({validationState1: 'success'});
    if (this.state.email1 == '') this.setState({
      email1Placeholder : 'You must enter an email.',
      validationState2: 'error'});
    else if (this.state.email1 != this.state.email2) this.setState({
      email1: '',
      email2: '',
      email1Placeholder : 'The emails do not match.',
      email2Placeholder : 'The emails do not match.',
      validationState2: 'error'});
    else this.setState({validationState2: 'success'});
    if (this.state.password1 == '') this.setState({
      password1Placeholder : 'You must enter a password.',
      validationState3: 'error'});
    else if (this.state.password1 != this.state.password2) this.setState({
      password1: '',
      password2: '',
      password1Placeholder : 'The passwords do not match.',
      password2Placeholder : 'The passwords do not match.',
      validationState3: 'error'});
    else this.setState({validationState3: 'success'});
  }

  render(){
    return(
      <div>
        <Grid>
          <br />
            <Row>
                <center><img src="images/gate.png" alt="gate" width={100} height={100}/></center>
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
                    validationState = {this.state.validationState1}
                    >
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder = {this.state.usernamePlaceholder}
                        onChange = {this.handleUsername}
                        value = {this.state.username}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup
                      controlId="formBasicText"
                      validationState = {this.state.validationState2}
                      >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder = {this.state.email1Placeholder}
                          onChange = {this.handleEmail1}
                          value = {this.state.email1}
                        />
                        <FormControl.Feedback />
                      </FormGroup>
                      <FormGroup
                        controlId="formBasicText"
                        validationState = {this.state.validationState2}
                        >
                          <ControlLabel>Confirm Email</ControlLabel>
                          <FormControl
                            type="text"
                            placeholder = {this.state.email2Placeholder}
                            onChange = {this.handleEmail2}
                            value = {this.state.email2}
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                    <FormGroup
                      controlId="formBasicText"
                      validationState = {this.state.validationState3}
                      >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder = {this.state.password1Placeholder}
                          onChange = {this.handlePassword1}
                          value = {this.state.password1}
                        />
                        <FormControl.Feedback />
                      </FormGroup>
                      <FormGroup
                        controlId="formBasicText"
                        validationState = {this.state.validationState3}
                        >
                          <ControlLabel>Confirm Password</ControlLabel>
                          <FormControl
                            type="text"
                            placeholder = {this.state.password2Placeholder}
                            onChange = {this.handlePassword2}
                            value = {this.state.password2}
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
