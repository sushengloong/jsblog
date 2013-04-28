App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
  this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find(); 
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  doneEditing: function() {
    this.set('isEditing', false);
  },

  edit: function() {
    this.set('isEditing', true);
  }

});

App.Post = DS.Model.extend({
  title      : DS.attr('string'),
  author     : DS.attr('string'),
  intro      : DS.attr('string'),
  extended   : DS.attr('string'),
  publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
  id         : 1,
  title      : "Hello Ember.JS",
  author     : "Sheng Loong",
  publishedAt: new Date('02-02-2013'),
  intro      : "*Ember.JS* is a cool JS MVC framework",
  extended   : "I love using [Ember.JS](http://emberjs.com/)"
}, {
  id         : 2,
  title      : "Hello Rails",
  author     : "Sheng Loong",
  publishedAt: new Date('05-04-2013'),
  intro      : "*Rails* is a cool Ruby MVC framework",
  extended   : "I love using [Rails](http://rubyonrails.org/)"
}];

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});
