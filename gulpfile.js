// TODO: Rewrite gulpfile to fit 4.0 syntax (named functions, take advantage of series/parallel)

var gulp = require('gulp');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var exec = require('child_process').exec;
var del = require('del');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');

var paths = {
	src: 'src/**/*',
	srcHTML: 'src/**/*.html',
	srcCSS: 'src/**/*.css',
	srcJS: 'src/**/*.js',

	tmp: 'tmp',
	tmpHTML: 'tmp/**/*.html',
	tmpCSS: 'tmp/**/*.css',
	tmpJS: 'tmp/**/*.js',

	dist: 'dist',
	distHTML: 'dist/**/*.html',
	distCSS: 'dist/**/*.css',
	distJS: 'dist/**/*.js',
	
	srcJSON: 'tools/*.json'
};

/**
 * DEVELOPMENT
 */
gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});
gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});
gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});
gulp.task('json', function () {
  return gulp.src(paths.srcJSON).pipe(gulp.dest(paths.tmp));
});

gulp.task('clean_json', async function () {
  del([paths.srcJSON]);
});

gulp.task('compile_json', function (cb) {
	exec('python tools/db_compile.py', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
})

gulp.task('copy', gulp.series('html', 'css', 'js', 'compile_json', 'json', 'clean_json'));

gulp.task('inject', gulp.series('copy', function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpHTML)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.tmp));
}));

gulp.task('serve', gulp.series('inject', function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
			livereload: true
    }));
}));

gulp.task('watch', gulp.series('serve', function () {
	gulp.watch(paths.src, gulp.series('inject'));
}));

gulp.task('default', gulp.series('watch'));
/**
 * DEVELOPMENT END
 */



/**
 * PRODUCTION
 */
gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('js:dist', function () {
  return gulp.src(paths.srcJS)
    .pipe(concat('script.min.js'))
    .pipe(terser())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('json:dist', function () {
  return gulp.src(paths.srcJSON)
    .pipe(gulp.dest(paths.dist));
});
gulp.task('copy:dist', gulp.series('html:dist', 'css:dist', 'js:dist', 'compile_json', 'json:dist', 'clean_json'));
gulp.task('inject:dist', gulp.series('copy:dist', function () {
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);
  return gulp.src(paths.distHTML)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist));
}));

gulp.task('serve:dist', gulp.series('inject:dist', function () {
  return gulp.src(paths.dist)
    .pipe(webserver({
      port: 3000,
			livereload: true
    }));
}));

gulp.task('watch:dist', gulp.series('serve:dist', function () {
	gulp.watch(paths.src, gulp.series('inject:dist'));
}));

gulp.task('build', gulp.series('watch:dist'));
/**
 * PRODUCTION END
 */

gulp.task('clean', async function () {
  del([paths.tmp, paths.dist]);
});