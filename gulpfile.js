/**
 *  gulp [Task | Target]
 *
 *  Available Build Task(s)
 *    - clean
 *    - concat
 *    - minify
 *    - compress
 *    - prefix
 *    - copy
 *    - deconsole
 *
 *  Available Build Target(s)
 *    - build
 *    - dist
 *    - test
 */

var gulp = require('gulp');
//var prefix = require('gulp-autoprefixer');
//var minifyCss = require('gulp-minify-css');
//var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
//var stripDebug = require('gulp-strip-debug');


gulp.task('clean', function () {
    gulp.src('build/**/*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task("concat", ["clean"], function () {
    gulp.src('js/**/*.js')
        .pipe(concat('jqm.editable.listview.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task("minify", ["concat"], function () {
   gulp.src('build/*.js')
        .pipe(rename('jqm.editable.listview.min.js'))
//        .pipe(uglify())
        .pipe(gulp.dest('build/'))
});
//
//gulp.task("compress", ["minify"], function () {
//    var stream = gulp.src(CONFIG.MINIFY.JS.DESTINATION + '/' + CONFIG.MINIFY.JS.NAME)
//        .pipe(gzip())
//        .pipe(gulp.dest(CONFIG.COMPRESS.JS.DESTINATION))
//        .pipe(filesize());
//    return stream;
//});
//
//// CSS autoprefixing
//gulp.task('prefix', function () {
//    gulp.src(CONFIG.CSS.SRCPATHS)
//        .pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 7"))
//        .pipe(rename(CONFIG.CSS.NAME))
//        .pipe(gulp.dest(CONFIG.CSS.COMPILEDPATH))
//});
//
//gulp.task('copy', function () {
//    gulp.src('./indexsrc.html')
//        .pipe(gulp.dest('./build'))
//});
//
//// Strip console, alert and debugger statements from JS code
//gulp.task('deconsole', function () {
//    gulp.src(CONFIG.CONCAT.JS.DESTINATION)
//        .pipe(stripDebug())
//        .pipe(rename(CONFIG.CONCAT.JS.NO_DEBUG_NAME))
//        .pipe(gulp.dest(CONFIG.CONCAT.JS.DESTINATION));
//});
//
///////////////////////////////////////////////////////////////////////
//
//// Gulp Build Targets
//
//gulp.task('default', function () {
//    // make my JavaScript ugly
//    gulp.watch("./dev/js/**/*.js", function (event) {
//        gulp.run('uglify');
//    });
//    // images
//    gulp.watch("./dev/img/**/*", function (event) {
//        gulp.run('imagemin');
//        gulp.run('svgmin');
//    });
//});
//
gulp.task("build", function () {
    gulp.run('compress');
});
//
//// Test Build
//gulp.task('test-build', function() {
//    gulp.src('indexsrc.html')
//        .pipe(rename('index.html'))
//        .pipe(fileinclude())
//        .pipe(usemin({
//            css: [minifyCss(), 'concat'],
//            html: [minifyHtml({empty: true})],
//            js: [uglify()]
//        }))
//        .pipe(gulp.dest(CONFIG.HTML.BUILDPATH));
//});
//
//gulp.task('test-build-watch', function() {
//    gulp.watch(['./*.html', './*.css'], function (event) {
//        gulp.src(CONFIG.HTML.SRCPATHS)
//            .pipe(rename('index.html'))
//            .pipe(fileinclude())
//            .pipe(usemin())
//            .pipe(gulp.dest(CONFIG.HTML.BUILDPATH));
//    });
//});
//
////Production Build
//gulp.task("prod-build", function () {
//    gulp.run('usemin');
//});
