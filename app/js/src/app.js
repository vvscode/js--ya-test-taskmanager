define('taskManagerApp', ['backbone'], function (Backbone) {
    var App = Backbone.View.extend({
        initialize: function (options) {
            this.$el.html('<h1>Lets start!</h1>');
            console.log('taskManagerApp  initialize');
        }
    });
    return App;
});