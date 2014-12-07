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

/** gulp tasks */

help(gulp);

gulp.task('clean', 'Cleans the build folder.', [], function () {
    "use strict";
    
    del([
        'build/**'
    ]);
    
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

gulp.task("build", '(default task) Cleans, concatenates and minifies all script files into build folder.', [], function () {
    "use strict";
    gulp.run('clean');
    gulp.run('concat');
    gulp.run('minify');
    gulp.run('assets');
    gulp.run('minify-css');
}, {
    aliases: ['b', 'B']
});

gulp.task('default', function () {
    "use strict";
    gulp.run('build');
});

