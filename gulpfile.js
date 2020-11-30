//gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var terser = require('gulp-terser');
var exec = require('child_process').exec;
 
//script paths
var jsFiles = 'src/*.js',
    jsDest = 'bld';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        // .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(terser())
        .pipe(gulp.dest(jsDest));
});

gulp.task('json', function (cb) {
  exec('python tools/db_compile.py', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
