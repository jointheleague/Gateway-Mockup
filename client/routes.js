//do this on client for super fast switching
Router.route('/', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('landing')
});
Router.route('/dashboard',function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('clientDashboard'); //logict to choose wich dashboard to render
});
