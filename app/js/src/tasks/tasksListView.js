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
        serializeData: function(){
            var data = {};
            data.title = this.options.title || 'Tasks list';

            return data;
        },
        // Add filtering ability.
        // See http://tony.abou-assaleh.net/web-development/backbone-marionette-filtered-collection-views
        addChildView: function (item, collection, options) {
            var filter = this.options.filter || this.filter;
            if (filter && !filter(item)) return;
            this.closeEmptyView();
            var ItemView = this.getItemView();
            return this.addItemView(item, ItemView, options.index);
        },
        showCollection: function() {
            var filter = this.options.filter || this.filter;
            var that = this;
            var ItemView = this.getItemView();
            this.collection.each(function(item, index){
                if (filter && ! filter(item)) return;
                that.addItemView(item, ItemView, index);
            });
        }
    });

    return TasksListView;
});