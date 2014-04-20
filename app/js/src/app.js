define('taskManagerApp', ['marionette', 'TasksCollection', 'TasksListView'], function (Marionette, TasksCollection, TasksListView) {
    var taskManagerApp = new Marionette.Application();

    taskManagerApp.addRegions({
        'mainRegion': '#task-manager'
    })

    taskManagerApp.on("initialize:after", function () {
        console.log("taskManagerApp has started");

        if (Backbone.history) {
            Backbone.history.start();
        }

        taskManagerApp.taksView = new TasksListView({collection: new TasksCollection()});

        taskManagerApp.mainRegion.show(taskManagerApp.taksView);
    });

    return  taskManagerApp;
});