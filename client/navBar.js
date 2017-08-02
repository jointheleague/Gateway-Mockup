import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './navBar.html';
Template.navBar.helpers({
  isDashboard(){
    if (Router.current().route.getName() === "dashboard") {
      return true;
    }else{
      return false;
    }
  }
});
