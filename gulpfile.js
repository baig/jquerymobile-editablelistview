/**
 *  gulp [Task]
 *
 *  Available Build Task(s)
 *    - clean
 *    - concat
 *    - minify
 *    - minify-css
 *    - build
 */

var gulp = require('gulp');
var help = require('gulp-help');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var noop = function () {};

//var usemin = require('gulp-usemin');
//var sourcemaps = require('gulp-sourcemaps');

/** gulp tasks */

help(gulp);

// Clean
gulp.task('clean', 'Cleans the build folder.', [], function (cb) {
    "use strict";

    del([
        'build/**'
    ], cb);

}, {
    aliases: ['c', 'C']
});

gulp.task("concat", 'Joins all the script files putting them in build folder.', [], function () {
    "use strict";
    gulp.src(['js/editable-listview.js', 'js/**/*.js'])
        .pipe(concat('jqm.editable.listview.js'))
        .pipe(gulp.dest('build/'));
}, {
    aliases: ['j', 'J']
});

gulp.task("minify", 'Minifies all the script files.', [], function () {
    "use strict";
    gulp.src(['js/editable-listview.js', 'js/**/*.js'])
        .pipe(concat('jqm.editable.listview.js'))
        .pipe(rename('jqm.editable.listview.min.js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('build/'));
}, {
    aliases: ['m', 'M']
});

gulp.task("minify-css", 'Minifies the CSS stylesheets.', [], function() {
    "use strict";
    gulp.src('css/**/*.css')
        .pipe(concat('jqm.editable.listview.min.css'))
        .pipe(minifyCss({
            noAdvanced: false
        }))
        .pipe(gulp.dest('build'));
}, {
    aliases: ['s', 'S']
});

gulp.task("assets", 'Copies all assets (css stylesheets, images etc.) to the build folder.', [], function(){
    "use strict";
    gulp.src("css/**/*")
        .pipe(concat("jqm.editable.listview.css"))
        .pipe(gulp.dest('build'));
}, {
    aliases: ['a', 'A']
});

gulp.task("build", '(default task) Cleans, concatenates and minifies all script files into build folder.', [
    'clean',
    'concat',
    'minify',
    'assets',
    'minify-css'
], noop, {
    aliases: ['b', 'B']
});

gulp.task('lint', '', [], function () {
    /* style and lint errors */
    var jscs = require('gulp-jscs');
    var jshint = require('gulp-jshint');
    var stylish = require('gulp-jscs-stylish');

    gulp.src('js/*.js')
        .pipe(jshint())                           // hint
        .pipe(jscs())                             // enforce style guide
        .on('error', noop)                        // don't stop on error
        .pipe(stylish.combineWithHintResults())   // combine with jshint results
        .pipe(jshint.reporter('jshint-stylish'));    // use any jshint reporter to log hint and style guide errors
});

gulp.task('unit', '', [], function () {
    var mocha = require('gulp-mocha');
    var chai = require('chai');

    return gulp.src(['test/js/**/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: chai.expect
            }
        }));
});

gulp.task('default', '', ['build']);

gulp.task('test', ['lint', 'unit']);

//gulp.task('test-watch', function () {
//    gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
//});

