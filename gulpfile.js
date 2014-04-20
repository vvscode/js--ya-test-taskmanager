var gulp = require('gulp');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');
var rjs = require('gulp-requirejs');

gulp.task('requirejsBuild', function() {
    rjs({
        baseUrl: 'app/js/',
        include: [
            'main.js',
            'src/app.js',
            'src/tasks/task.js',
            'src/tasks/tasks.js',
            'src/tasks/taskView.js',
            'src/tasks/taskFormView.js',
            'src/tasks/tasksListView.js',
            'src/tasks/eventBus.js'
        ],
        'paths': {
            'backbone': './../../vendors/backbone/backbone',
            'underscore': './../../vendors/lodash/dist/lodash',
            'jquery': './../../vendors/jquery/dist/jquery',
            'marionette': './../../vendors/marionette/lib/backbone.marionette',
            'backbone.localstorage': './../../vendors/backbone.localstorage/backbone.localStorage',
            'jst': './src/tasks/templates/templates',
            'taskManagerApp': './src/app'
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
        .pipe(gulp.dest('./app/')); // pipe it to the output DIR
});

gulp.task('templates', function() {
    gulp.src(['app/js/src/tasks/views/*'])
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/js/src/tasks/templates'));
});

gulp.task('concat', function() {
    gulp.src(['app/js/src/tasks/*.js', 'app/js/src/*.js', 'app/js/src/tasks/templates/*.js', 'app/js/main.js'])
        .pipe(concat('main.concat.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/src/tasks/views/*', ['templates']);
});

gulp.task('default', ['templates', 'concat']);