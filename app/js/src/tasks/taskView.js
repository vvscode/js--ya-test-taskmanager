define('TaskView', ['marionette', 'jst'], function (Marionette, JST) {
    var TaskView = Marionette.ItemView.extend({
        template: JST["task.html"]
    });
    return TaskView;
});