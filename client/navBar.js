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
  },
  isTestPage(){
    if (Router.current().route.getName() === "testPage") {
      return true;
    }else{
      return false;
    }
  },
  isProfile(){
    if(Router.current().route.getName() === "profile"){
      return true;
    }else{
      return false;
    }
  },
  currentUsername(){
    return Meteor.user().username;
  }
});
