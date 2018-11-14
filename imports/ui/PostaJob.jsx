import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import LanguageSearch from './LanguageSearch';
import { Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
import '../rpc/JobRPC';

export default class PostaJob extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      desc: "",
      level: 0,
      selectedLangs: []
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.setLangs = this.setLangs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setLangs(langs) {
    this.setState({
      selectedLangs: langs
    });
  }

  onSubmit(e) {
    // if(this.state.title && this.state.desc && this.state.level) {
      Meteor.call("job.add", {
        name: this.state.title,
        desc: this.state.desc,
        level: this.state.level,
        langs: this.state.selectedLangs,
        client: Meteor.user().profile.username,
        applicants: [],
        comments: []
      }, (err, result) => {
        window.location.href = "/job/" + this.state.title;
      });
    // }
  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  updateDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }

  updateLevel(e) {
    this.setState({
      level: parseInt(e.target.value)
    });
  }

  render(){
    return(
      <div>
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
                  <FormGroup controlId="formBasicText">
                      <ControlLabel>Job Title</ControlLabel>
                      <FormControl onChange={this.updateTitle} type="text" placeholder="title" />
                      <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Job Description</ControlLabel>
                    <FormControl onChange={this.updateDesc} componentClass="textarea" placeholder="job details..." />
                  </FormGroup>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Job Level</ControlLabel>
                    <FormControl onChange={this.updateLevel} type="text" placeholder="level" />
                    <FormControl.Feedback />
                  </FormGroup>
                  <LanguageSearch
                    languageList={this.state.selectedLangs}
    								setLangs={this.setLangs}></LanguageSearch>
                  <Button onClick={this.onSubmit} bsStyle="primary">Create Job</Button>
                  </form>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
