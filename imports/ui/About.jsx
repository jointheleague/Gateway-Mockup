import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Grid, Col, Panel } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base'
import { withTracker } from "meteor/react-meteor-data";

class About extends Component {
  getClients(){
    return this.props.accounts.length;
  }
  getJobs(){
    return this.props.jobs.length;
  }
  render() {
    return (
      <div>
        <Grid>
          <div style={{"fontSize": "18px"}}>
            <div style={{margin: "auto"}}>
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
          <legend style={{"textAlign" : "center"}}> Lifetime Statistics </legend>
            <div style={{"fontSize": "18px", margin: "0 auto", width: "50%"}}>
              <Col md={6}>
                <img src="images/computerIcon.svg" width="75px;" />
                <br />
                {this.getClients()} Coders
              </Col>
              <Col md={6}>
                <img src="images/checkIcon.svg" width="75px;" />
                <br />
                {this.getJobs()} Jobs Posted
              </Col>
            </div>
        </Grid>
      </div>
    );
  }
}
export default withTracker(() => {
	const jobsHandle = Meteor.subscribe("jobs");
	const dataIsReady = jobsHandle.ready();
	return {
		dataIsReady,
		jobs: dataIsReady ? Jobs.find({}).fetch() : [],
    accounts: dataIsReady ? Meteor.users.find({}).fetch() : []
	};
})(About);
