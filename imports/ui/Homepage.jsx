import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
	Col, Panel, Jumbotron, Grid, Row, PageHeader, Button
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import HomepageCarousel from './HomepageCarousel';
import '../../node_modules/bootstrap-social/bootstrap-social.css';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin() {
		Meteor.loginWithGithub({}, () => {
			window.location.href = '/dashboard';
		});
	}

	render() {
		return (
			<div>
				<div style={{
				  background: 'linear-gradient(to right, rgba(236, 240, 241,1.0), rgba(236, 240, 241,1.0) 5%, rgba(52, 152, 219,1.0), rgba(52, 152, 219,1.0) 95%)',
				  width: '100%',
				  height: '100%'
				}}>
					<Grid>
						<Row>
							<Col md={12}>
								<Jumbotron>
									<PageHeader>LeaguedIn <img src="images/LeaguedIn.png" width='100px'/></PageHeader>
									<br />
									<p>LeaguedIn connects upcoming developers with clients who need jobs completed in the computer science industry. This system allows new developers to gain real world experience, while clients get work completed free of charge, all while knowing they are contributing to the education for the next generation of programmers.	</p>



									<Button onClick={this.onLogin}> Login With GitHub </Button>
									<br />
								</Jumbotron>
								<a className="btn btn-block btn-social btn-github">
									<span className="fa fa-github"></span> Sign in with GitHub
								</a>
							</Col>
							<Col md={10}>
								<Panel header="Example Jobs">
									<Row>
										<Col md={9}>
											<a href="/jobs/letseat">
												Let's Eat
											</a>
											&nbsp;A food locator app
										</Col>
										<br />
										<Col md={9}>
											<a href="/jobs/crimeapp">
												Crime Data App
											</a>
											&nbsp;A navigation app to avoid crime
										</Col>
									</Row>
									<Panel header="Featured Users">
										<HomepageCarousel />
									</Panel>
								</Panel>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withRouter(Homepage);
