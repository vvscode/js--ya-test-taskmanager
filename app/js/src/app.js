define(
    'taskManagerApp',
    ['marionette', 'TasksCollection', 'TasksListView', 'taskFormView', 'eventBus'],
    function (Marionette, TasksCollection, TasksListView, taskFormView, eventBus) {
        var taskManagerApp = new Marionette.Application();

        taskManagerApp.addRegions({
            'mainRegion': '#task-manager',
            'suspenseRegion': '#task-manager-suspense',
            'dealingRegion': '#task-manager-dealing',
            'completedRegion': '#task-manager-completed',
            'taskFormRegion': '#task-form'
        });

        taskManagerApp.on("initialize:after", function () {
            if (Backbone.history) {
                Backbone.history.start();
            }

            taskManagerApp.tasksList =  new TasksCollection();
            taskManagerApp.taksView = new TasksListView({collection: taskManagerApp.tasksList});

            taskManagerApp.taksViewSuspense = new TasksListView({
                collection: taskManagerApp.tasksList,
                filter: function(item){ return item.get('state') == 'suspense'; },
                title: 'Suspense list'
            });

            taskManagerApp.taksViewDealing = new TasksListView({
                collection: taskManagerApp.tasksList,
                filter: function(item){ return item.get('state') == 'dealing'; },
                title: 'Dealing list'
            });

            taskManagerApp.taksViewCompleted = new TasksListView({
                collection: taskManagerApp.tasksList,
                filter: function(item){ return item.get('state') == 'completed'; },
                title: 'Completed list'
            });

            taskManagerApp.mainRegion.show(taskManagerApp.taksView);
            taskManagerApp.suspenseRegion.show(taskManagerApp.taksViewSuspense);
            taskManagerApp.dealingRegion.show(taskManagerApp.taksViewDealing);
            taskManagerApp.completedRegion.show(taskManagerApp.taksViewCompleted);
        });

        taskManagerApp.listenTo(eventBus, 'addNewTask', function () {
            var formVew = new taskFormView();
            taskManagerApp.taskFormRegion.show(formVew);
        });

        taskManagerApp.listenTo(eventBus, 'editTask', function (data) {
            var formVew = new taskFormView({model: taskManagerApp.tasksList.get(data.id)});
            taskManagerApp.taskFormRegion.show(formVew);
        });

        taskManagerApp.listenTo(eventBus, 'saveTask', function (data) {
            if(!data.id){
                taskManagerApp.tasksList.create(data);
            } else {
                taskManagerApp.tasksList.get(data.id).set(data);
            }
        });

        return  taskManagerApp;
    });