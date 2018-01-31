import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import HomepageCarousel from './HomepageCarousel';
import { Col, Panel, Jumbotron, Grid, Row, PageHeader, Button } from 'react-bootstrap';

export default class Homepage extends Component {
	render() {
		return(
			<div>
				<div style={{
						'background': 'linear-gradient(to right, rgba(236, 240, 241,1.0), rgba(236, 240, 241,1.0) 5%, rgba(52, 152, 219,1.0), rgba(52, 152, 219,1.0) 95%)',
						'width': '100%',
						'height': '100%'
					}}>
					<Grid>
						<Row>
							<Col md={12}>
								<Jumbotron>
									<PageHeader>Project Gateway</PageHeader>
									<br />
									<p>Project Gateway is a website that allows anyone who wants code written to have it, free of charge. New and upcoming developers can see your job posting and begin working on it. After a few developers have submitted the code, you can choose your favorite. The winning developer will gain points. This allows new developers to gain experience in real world applications in low stress environments without bias against them because they don't have a lot of experience.</p>
									<a href="/signup"><Button bsStyle="primary" bsSize="lg">Sign Up!</Button></a>
									<br />
									<Col md={4} mdOffset={5}>
										<span>Already a member? <a href="/login">Log in.</a></span>
									</Col>
								</Jumbotron>
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
										<br/>
										<Col md={9}>
											<a href="/jobs/crimeapp">
												Crime Data App
											</a>
											&nbsp;A navigation app to avoid crime
										</Col>
									</Row>
									<Panel header="Featured Users">
										<HomepageCarousel></HomepageCarousel>
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