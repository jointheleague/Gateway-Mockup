import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

NavItem.prototype.handleClick = function handleClick(e) {
  if (this.props.onSelect) {    
    if (!this.props.disabled) {
      this.props.onSelect(this.props.eventKey, e);
    }
  }
};

export default class AppNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Gateway Mockup</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/dashboard">Dashboard</NavItem>
              <NavItem eventKey={2} href="/profile">Profile</NavItem>
              <NavItem eventKey={3} href="/jobs">Jobs</NavItem>
              <NavItem eventKey={4} href="/about">About</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={5} href="/jobs/edit">Post a Job</NavItem>
              <NavDropdown eventKey={6} title={this.props.username} id="basic-nav-dropdown">
                <MenuItem eventKey={6.1} href="/profile">Profile</MenuItem>
                <MenuItem eventKey={6.2}>Switch to Freelancer</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={6.3} href="/logout">Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
    username: PropTypes.string.isRequired
}