//do this on client for super fast switching
Router.route('/', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('landing');
  this.render('footer',{to: 'footer'})
});
Router.route('/dashboard',function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('clientDashboard'); //logict to choose wich dashboard to render
  this.render('footer',{to: 'footer'})
});
Router.route('/testPage', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('Blank');
  this.render('footer',{to: 'footer'})
});
Router.route('/profile', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('profile');
  this.render('footer',{to: 'footer'})
});
Router.route('/signup', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('signup');
  this.render('footer',{to: 'footer'})
});
Router.route('/login', function(){
  this.layout('ApplicationLayout');
  this.render('navBar', {to: 'top'});
  this.render('login');
  this.render('footer',{to: 'footer'})
});
