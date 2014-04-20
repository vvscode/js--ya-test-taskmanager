define('TasksListView', ['marionette', 'TaskView', 'eventBus'], function (Marionette, TaskView, eventBus) {
    var TasksListView = Marionette.CompositeView.extend({
        itemView: TaskView,
        template: JST["taskList.html"],
        events: {
            'click .js-new-task': 'addNewTask'
        },
        addNewTask: function () {
            eventBus.trigger('addNewTask');
        }
    });

    return TasksListView;
});