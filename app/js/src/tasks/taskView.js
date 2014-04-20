define('TaskView', ['marionette', 'jst', 'eventBus'], function (Marionette, JST, eventBus) {
    var TaskView = Marionette.ItemView.extend({
        template: JST["taskListItem.html"],
        events: {
            'click .edit': 'edit'
        },
        modelEvents:{
            'change': 'render'
        },
        edit: function () {
            eventBus.trigger('editTask', this.model.toJSON());
        }
    });
    return TaskView;
});