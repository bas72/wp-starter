import del         from 'del';
import cssnano     from 'gulp-cssnano';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import gutil       from 'gulp-util';
import postcss     from 'gulp-postcss';
import sass        from 'gulp-sass';
import concat      from 'gulp-concat';
import changed     from 'gulp-changed';
import livereload  from 'gulp-livereload';

import config     from './config';

const production = !!gutil.env.production;

gulp.task('css', (done) => {
  gulp.src(config.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(config.css.postcss))
    .pipe(gulpif(production, cssnano()))
    .pipe(gulp.dest(config.css.dest))
    .pipe(livereload());
    done();
});

gulp.task('js', (done) => {
  gulp.src(config.js.src)
    .pipe(concat('site.js'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(livereload());
    done();
});

gulp.task('images', (done) => {
  gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.images.dest))
    .pipe(livereload());
    done();
});

gulp.task('watch', (done) => {
  livereload.listen();
  gulp.watch(config.css.src, gulp.series('css'));
  gulp.watch(config.js.src, gulp.series('js'));
  done();
});

gulp.task('clean', (done) => {
  del.sync([
    config.css.dest + 'style.css',
    config.js.dest + 'site.js'
  ]);
  done();
});

gulp.task('compile', gulp.series(
  'clean',
  gulp.parallel('css', 'js')
));

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('css', 'js'),
  gulp.parallel('watch')
));
