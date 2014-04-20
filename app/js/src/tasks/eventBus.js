define('eventBus', ['backbone', 'underscore'], function (Backbone, _) {
    var eventBus = {};

    _.extend(eventBus, Backbone.Events);

    eventBus.on('all', function () {
        console.info('eventBus message: ', arguments);
    })

    return eventBus;
});