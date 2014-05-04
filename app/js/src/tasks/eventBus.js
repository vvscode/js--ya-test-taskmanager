define('eventBus', ['backbone', 'underscore'], function (Backbone, _) {
    var eventBus = {};

    _.extend(eventBus, Backbone.Events);

    eventBus.on('all', function () {
        if(window.DEBUG_MODE){
            console.info('eventBus message: ', arguments);
        }
    });

    return eventBus;
});