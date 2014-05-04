define('TaskModel', ['backbone'], function (Backbone) {
    var statuses = ['suspense', 'dealing', 'completed'];

    var TaskModel = Backbone.Model.extend({
        defaults: {
            id: null,
            name: '',
            description: '',
            state: 'suspense'
        },
        validate: function (attrs, options) {
            if (!attrs.name) {
                return 'Task name can\'t be blank';
            }
            if (!attrs.description) {
                return 'Task description can\'t be blank';
            }
            if (statuses.indexOf(attrs.state) < 0) {
                return 'Illegal task status';
            }
        },
        getPossibleStatuses: function () {
            return _.compact(statuses);
        }
    });
    return TaskModel;
});