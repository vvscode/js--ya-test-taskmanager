define('TasksListView', ['marionette', 'TaskView', 'eventBus'], function (Marionette, TaskView, eventBus) {
    var TasksListView = Marionette.CompositeView.extend({
        itemView: TaskView,
        template: JST["taskList.html"],
        events: {
            'click .js-new-task': 'addNewTask'
        },
        addNewTask: function () {
            eventBus.trigger('addNewTask');
        },
        modelEvents: {
            "change": "modelChanged"
        },
        serializeData: function () {
            var data = {};
            data.title = this.options.title || 'Tasks list';
            data.targetStatus = this.options.targetStatus || '';
            return data;
        },
        onRender: function () {
            this.$el.addClass((this.options.targetStatus || '') + '-only');
        }
    });

    return TasksListView;
});