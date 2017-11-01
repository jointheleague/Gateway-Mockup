import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';

export default class App extends Component {
  render() {
  	return(
	  	<div>
	  		<AppNavbar username="lucas.baizer"></AppNavbar>
	    </div>
    );
  }
}