import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
	Grid, Row, Button
} from 'react-bootstrap';

export default class SignUp extends Component {
	constructor() {
		super();
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin() {
		Meteor.loginWithGithub();
	}

	render() {
		return (
			<div>
				<Grid>
					<br />
					<Row>
						<center><img src="images/gate.png" alt="gate" width={100} height={100} /></center>
					</Row>
					<br />
					<Row>
						<center><h3>Sign up for Gateway</h3></center>
					</Row>
					<br />
					<Row>
						<Button onClick={this.onLogin}> Login With GitHub </Button>
					</Row>
				</Grid>
			</div>
		);
	}
}
