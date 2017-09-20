import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './navBar.html';

Template.navBar.helpers({
  isDashboard(){
    return Router.current().route.getName() === "dashboard";
  },
  isTestPage(){
    return Router.current().route.getName() === "testPage";
  },
  isProfile(){
    return Router.current().route.getName() != undefined && Router.current().route.getName().includes("profile");
  },
  isFreelancer(){
    if(Meteor.userId != undefined){
      return true;
    }else{
      return false;
    }
  },
  isAbout(){
    return Router.current().route.getName() != undefined && Router.current().route.getName().includes("about");
  },
  currentUsername(){
    return Meteor.user().username;
  }
});
