define('TasksListView', ['marionette', 'TaskView'], function (Marionette, TaskView) {
    var TasksListView = Marionette.CompositeView.extend({
        itemView: TaskView,
        template: JST["tasklist.html"]
    });

    return TasksListView;
});