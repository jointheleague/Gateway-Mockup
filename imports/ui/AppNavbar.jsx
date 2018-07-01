import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {browserHistory} from 'react-router';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

NavItem.prototype.handleClick = function handleClick(e) {
  if (this.props.onSelect) {
    if (!this.props.disabled) {
      this.props.onSelect(this.props.eventKey, e);
    }
  }
};

class AppNavbar extends Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    Meteor.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Gateway Mockup</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/dashboard">Dashboard</NavItem>
              <NavItem eventKey={2} href={"/profile/" + this.props.profile.github}>Profile</NavItem>
              <NavItem eventKey={3} href="/jobs">Jobs</NavItem>
              <NavItem eventKey={4} href="/about">About</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={5} href="/jobs/edit">Post a Job</NavItem>
              <NavDropdown eventKey={6} title={this.props.profile.github} id="basic-nav-dropdown">
                <MenuItem eventKey={6.1} href={"/profile/" + this.props.profile.github}>Profile</MenuItem>
                <MenuItem eventKey={6.2}>Switch to Freelancer</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={6.3} onClick={this.onLogout}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
    profile: PropTypes.object.isRequired
}

export default withRouter(AppNavbar);
