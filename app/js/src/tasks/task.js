define('TaskModel', ['backbone'], function (Backbone) {
    var TaskModel = Backbone.Model.extend({
        defaults:{
            name: '',
            description: '',
            state: 'suspense'
        }
    });
    return TaskModel;
});