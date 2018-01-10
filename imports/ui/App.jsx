import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import HomepageCarousel from './HomepageCarousel';
import { Col, Panel, Jumbotron, Grid, Row, PageHeader, Button } from 'react-bootstrap';

export default class App extends Component {
	render() {
		const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, {}));

		return(
			<div>
				<AppNavbar username="lucas.baizer"></AppNavbar>
				{childrenWithProps}
			</div>
		);
	}
}