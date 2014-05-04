define(
    'taskManagerApp',
    ['marionette', 'TasksCollection', 'TasksListView', 'taskFormView', 'eventBus', 'backbone-virtual-collection'],
    function (Marionette, TasksCollection, TasksListView, taskFormView, eventBus) {
        var taskManagerApp = new Marionette.Application();

        taskManagerApp.addRegions({
            'suspenseRegion': '#task-manager-suspense',
            'dealingRegion': '#task-manager-dealing',
            'completedRegion': '#task-manager-completed',
            'taskFormRegion': '#task-form'
        });

        taskManagerApp.on("initialize:after", function () {
            if (Backbone.history) {
                Backbone.history.start();
            }

            taskManagerApp.tasksList = new TasksCollection();

            taskManagerApp.taksViewSuspense = new TasksListView({
                collection: new Backbone.VirtualCollection(taskManagerApp.tasksList, {
                    filter: function (task) {
                        return task.get('state') == 'suspense';
                    }
                }),
                targetStatus: 'suspense',
                title: 'Suspense list'
            });

            taskManagerApp.taksViewDealing = new TasksListView({
                collection: new Backbone.VirtualCollection(taskManagerApp.tasksList, {
                    filter: function (task) {
                        return task.get('state') == 'dealing';
                    }
                }),
                targetStatus: 'dealing',
                title: 'Dealing list'
            });

            taskManagerApp.taksViewCompleted = new TasksListView({
                collection: new Backbone.VirtualCollection(taskManagerApp.tasksList, {
                    filter: function (task) {
                        return task.get('state') == 'completed';
                    }
                }),
                targetStatus: 'completed',
                title: 'Completed list'
            });

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
            taskManagerApp.tasksList.once('sync', function () {
                eventBus.trigger('task-saved', arguments);
            });

            if (!data.id) {
                taskManagerApp.tasksList.create(data, {wait: true});
            } else {
                taskManagerApp.tasksList.get(data.id).set(data).save(null, {wait: true});
            }
        });

        return  taskManagerApp;
    });