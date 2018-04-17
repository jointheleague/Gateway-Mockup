import React, { Component } from 'react';

export default class GatewayComponent extends Component {
  constructor(props) {
    super(props);

    this._profile = this.props.profile || null;
    this._user = this.props.user || null;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get profile() {
    return this._profile;
  }

  set profile(profile) {
    this._profile = profile;
  }

  getProfile() {
    return this._profile || this.__proto__.profile;
  }
};
