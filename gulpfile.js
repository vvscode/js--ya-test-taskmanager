var gulp = require('gulp');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');
var rjs = require('gulp-requirejs');
var jsmin = require('gulp-jsmin');
var minifyCSS = require('gulp-minify-css');
var Q = require('q');

gulp.task('templates', function() {
    /*
     For some strange reason, sequential tasks are started, if this task is the first - write a file does not have time to occur.
     To solve this problem (I google it, but did not find the solution, if you can - let me know),
      delay for file recording.
     */
    var deferred = Q.defer();

    gulp.src(['app/js/src/tasks/views/*'])
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/js/src/tasks/templates'));


    setTimeout(function() {
        deferred.resolve();
    }, 100);

    return deferred.promise;
});

gulp.task('requirejsBuild', ['templates'], function() {
    rjs({
        baseUrl: 'app/js/',
        include: [
            'src/tasks/task.js',
            'src/tasks/tasks.js',
            'src/tasks/taskView.js',
            'src/tasks/taskFormView.js',
            'src/tasks/tasksListView.js',
            'src/tasks/eventBus.js',
            'src/app.js',
            'main.js'
        ],
        'paths': {
            'backbone': './../../vendors/backbone/backbone',
            'underscore': './../../vendors/lodash/dist/lodash',
            'jquery': './../../vendors/jquery/dist/jquery',
            'marionette': './../../vendors/marionette/lib/core/amd/backbone.marionette',
            'backbone.localstorage': './../../vendors/backbone.localstorage/backbone.localStorage',
            'backbone.babysitter': './../../vendors/backbone.babysitter/lib/backbone.babysitter',
            'backbone.wreqr': './../../vendors/backbone.wreqr/lib/backbone.wreqr',
            'backbone-virtual-collection': './../../vendors/backbone-virtual-collection/backbone.virtual-collection',
            'jst': './src/tasks/templates/templates',
            'taskManagerApp': './src/app'
        },
        'shim': {
            'jquery': {
                'exports': 'jQuery'
            },
            'underscore': {
                'exports': '_'
            },
            'backbone': {
                'deps': ['jquery', 'underscore'],
                'exports': 'Backbone'
            },
            'backbone-localstorage': {
                deps: ['backbone']
            },
            'marionette': {
                'deps': ['jquery', 'underscore', 'backbone'],
                'exports': 'Marionette'
            },
            jst: {
                'exports': 'JST'
            }
        },
        out: 'app.concat.js'
    })
        .pipe(jsmin())
        .pipe(gulp.dest('./app/js/min/')); // pipe it to the output DIR
});

gulp.task('watchTemplates', function() {
    gulp.watch('app/js/src/tasks/views/*', ['requirejsBuild']);
});

gulp.task('default',['templates', 'requirejsBuild']);