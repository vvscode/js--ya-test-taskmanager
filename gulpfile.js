var gulp = require('gulp');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');

gulp.task('templates', function() {
    gulp.src(['app/js/src/tasks/views/*'])
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/js/src/tasks/templates'));
});

gulp.task('default', ['templates']);