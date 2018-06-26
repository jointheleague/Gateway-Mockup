import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Accounts } from 'meteor/std:accounts-ui';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

export default class SignUp extends Component {

  constructor(){
    super();

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
            <Accounts.ui.LoginForm />
              </Row>
            </Grid>
          </div>
        );
      }

    }
