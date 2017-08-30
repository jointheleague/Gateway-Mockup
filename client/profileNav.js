import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './profileNav.html';

Template.profileNav.helpers({
  isPageProfile(){
    if (Router.current().route.getName() === "profile") {
      return true;
    }else{
      return false;
    }
  },
  isPageMessages(){
    if (Router.current().route.getName() === "profile.messages") {
      return true;
    }else{
      return false;
    }
  }
});
