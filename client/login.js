import { Template } from 'meteor/templating';

import './login.html'

Template.login.onCreated(function helloOnCreated() {
  AccountsTemplates.setState('signIn');
});
