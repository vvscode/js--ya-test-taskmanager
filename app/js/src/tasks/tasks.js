define('TasksCollection', ['backbone', 'TaskModel', 'backbone.localstorage'], function (Backbone, TaskModel) {
    var TasksCollection = Backbone.Collection.extend({
        model: TaskModel,
        localStorage: new Backbone.LocalStorage('taskmanager:tasks'),
        initialize: function () {
            this.fetch();
        }
    });
    return TasksCollection;
});