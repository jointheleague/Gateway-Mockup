import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Col } from 'react-bootstrap';
import '../../node_modules/bootstrap-social/bootstrap-social.css';

export default class About extends Component {
	constructor() {
		super();

		this.state = {
			coders: 0,
			jobs: 0
		};

		Meteor.call('profile.getCount', (_error, result) => {
			this.setState({
				coders: result
			});
		});
		Meteor.call('job.getCount', (_error, result) => {
			this.setState({
				jobs: result
			});
		});
	}

	render() {
		return (
			<div>

				<Grid>
				<a className="btn btn-block btn-social btn-github">
					<span className="fa fa-github"></span> Sign in with GitHub
				</a>
					<div style={{ fontSize: '18px' }}>
						<div style={{ margin: 'auto' }}>
							<h2> About </h2>
							<br />
						</div>
						<p>
							Project Gateway aims to provide students with practical experience through real-world coding jobs. Students of all skill levels can apply and complete jobs in a multitude of different languages
							posted by various clients. Students will recieve feedback for their work through various metrics and comments. Clients will not only be able to speed up their workflow through outsourcing
							parts of their project to eager students, but will also have the opportunity to provide valuable learning experiance to aspiring programmers.
						</p>
					</div>
					<br />
					<legend style={{ textAlign: 'center' }}> Lifetime Statistics </legend>
					<div style={{ fontSize: '18px', margin: '0 auto', width: '50%' }}>
						<Col md={6}>
							<img src="images/computerIcon.svg" width="75px;" />
							<br />
							{this.state.coders}
							{' '}
							Coders
						</Col>
						<Col md={6}>
							<img src="images/checkIcon.svg" width="75px;" />
							<br />
							{this.state.jobs}
							{' '}
							Jobs Posted
						</Col>
					</div>
				</Grid>
			</div>
		);
	}
}
