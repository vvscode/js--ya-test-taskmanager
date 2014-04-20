define(
    'taskManagerApp',
    ['marionette', 'TasksCollection', 'TasksListView', 'taskFormView', 'eventBus'],
    function (Marionette, TasksCollection, TasksListView, taskFormView, eventBus) {
        var taskManagerApp = new Marionette.Application();

        taskManagerApp.addRegions({
            'mainRegion': '#task-manager',
            'taskFormRegion': '#task-form'
        });

        taskManagerApp.on("initialize:after", function () {
            if (Backbone.history) {
                Backbone.history.start();
            }

            taskManagerApp.tasksList =  new TasksCollection();
            taskManagerApp.taksView = new TasksListView({collection: taskManagerApp.tasksList});
            taskManagerApp.mainRegion.show(taskManagerApp.taksView);
        });

        taskManagerApp.listenTo(eventBus, 'addNewTask', function () {
            var formVew = new taskFormView();
            taskManagerApp.taskFormRegion.show(formVew);
        });


        taskManagerApp.listenTo(eventBus, 'saveTask', function (data) {
            if(!data.id){
                taskManagerApp.tasksList.create(data);
            } else {
                taskManagerApp.tasksList.set(data);
            }
        });

        return  taskManagerApp;
    });