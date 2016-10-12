var gulp = require('gulp');
var bower = require('bower');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var exec = require ('child_process').exec;
var wiredep = require('wiredep')({ src: './public/index.html' });

var paths = {
    js: [
        './public/app.js',
        './public/**/*.js',
    ]
};

/**
 * global launch task
 */
gulp.task('launch', ['injectJS', 'startServer']);

/**
 * inject js files into index.html
 */
gulp.task('injectJS', function(){
     return gulp.src('./public/index.html')
         .pipe(inject(
             gulp.src(paths.js,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('./public'));
 });

 gulp.task('startServer', function() {
    exec('node server', function (err, stdout, stderr) {});
});