require.config({
    paths: {
        backbone: './../../vendors/backbone/backbone',
        underscore: './../../vendors/lodash/dist/lodash',
        jquery: './../../vendors/jquery/dist/jquery',
        marionette: './../../vendors/marionette/lib/backbone.marionette',
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        }
    }
});


require(['taskManagerApp'], function (taskManagerApp) {
    new taskManagerApp({el: document.getElementById('task-manager')});
});