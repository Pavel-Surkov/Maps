const gulp = require('gulp');
const scss = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();

function css_minify(done) {

  gulp.src('css/**/*e.css')
  .pipe(scss({
    errorLogToConsole: true,
    outputStyle: 'compressed'
  }))

  .on('error', console.error.bind(console))
  .pipe(autoprefixer({
    overrideBrowserList: ['last 2 versions'],
    cascade: false
  }))

  
  .pipe( rename({suffix: '.min'}) )
  .pipe( gulp.dest('css/') )
  .pipe( browsersync.stream() );

  done();
}

function reload(done) {
	browsersync.reload();
	done();
}

function watchFiles() {
	gulp.watch('./css/**/style.css', css_minify);
	gulp.watch('./**/*.html', reload);
	gulp.watch('./**/*.js', reload);
}

gulp.task('css_minify', gulp.parallel(css_minify, watchFiles) );