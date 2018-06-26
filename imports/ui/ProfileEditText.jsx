import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import ProfileNav from './ProfileNav';
import UserTestimonial from './UserTestimonial';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem, Button, FormControl} from 'react-bootstrap';

export default class ProfileEditText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      saved: true,
      isEditMode: false
    };

    this.onSaveText = this.onSaveText.bind(this);
    this.onEditText = this.onEditText.bind(this);

    Meteor.call("profile.getTextField", "matt86707@Gmail.com", this.props.fieldName, (error, text) => {
      this.setState({
        text: text
      });
    });

  }

  onSaveText(){
    this.setState({saved : false});
    Meteor.call("profile.get", this.props.match.params.username, (error, profile) => {
      this.setState({
        saved : true
      });
    });
    this.setState({isEditMode : false});
  }

  onEditText(){
    this.setState({isEditMode : true});
  }

  render() {
    if(this.state.text == "") {
      return(
        <div>
          Loading...
        </div>
      );
    } else if (this.state.isEditMode) {
      return(
        <div>
          <FormControl
            type="text"
            value={this.state.text}
            placeholder="Enter text"
          />
          <br/>
          <div style={{paddingTop : '4px'}}>
            <Button onClick={this.onSaveText} bsStyle="primary" bsSize="xsmall">Save</Button>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          {this.state.text}
            <img src="images/EditPencil.svg" width="20px;" onClick={this.onEditText} />
        </div>
      );
    }
  }
}
