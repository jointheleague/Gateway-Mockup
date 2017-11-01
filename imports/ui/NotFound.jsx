import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';

export default class NotFound extends Component {
  render() {
  	return(
	  	<div>
	  		<AppNavbar username="lucas.baizer"></AppNavbar>
	  		Page not found. Find it better.
	    </div>
    );
  }
}