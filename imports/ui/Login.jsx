import React, { Component } from 'react';
import {
	Col, Panel, Grid, Row, form, FormGroup, Button, FormControl, ControlLabel
} from 'react-bootstrap';

export default class Login extends Component {
	render() {
		return (
			<div>
				<Grid>
					<br />
					<Row>
						<center><img src="images/gate.png" alt="..." width={100} height={100} /></center>
					</Row>
					<br />
					<Row>
						<center><h3>Sign in to Gateway</h3></center>
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
											placeholder="Username"
										/>
										<FormControl.Feedback />
									</FormGroup>
									<FormGroup
										controlId="formBasicText"
									>
										<ControlLabel>Password</ControlLabel>
										<FormControl
											type="text"
											placeholder="Password"
										/>
										<FormControl.Feedback />
										<a href="/forgotPassword">Forgot password?</a>
									</FormGroup>
									<a href="/profile"><Button bsStyle="primary">Sign in</Button></a>
								</form>
							</Panel>
							<Panel>
								<p>New to Gateway?</p>
								<a href="/signup">Create an account.</a>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
