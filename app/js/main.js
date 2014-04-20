require.config({
    'paths': {
        'backbone': './../../vendors/backbone/backbone',
        'underscore': './../../vendors/lodash/dist/lodash',
        'jquery': './../../vendors/jquery/dist/jquery',
        'marionette': './../../vendors/marionette/lib/backbone.marionette',
        'backbone.localstorage': './../../vendors/backbone.localstorage/backbone.localStorage',
        'jst': './src/tasks/templates/templates'
    },
    'shim': {
        'jquery': {
            'exports': 'jQuery'
        },
        'lodash': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'backbone-localstorage' : {
            deps: ['backbone']
        },
        'marionette': {
            'deps': ['jquery', 'underscore', 'backbone'],
            'exports': 'Marionette'
        },
        jst: {
            'exports': 'JST'
        }
    }
});


require(['taskManagerApp'], function (taskManagerApp) {
    taskManagerApp.start();
});