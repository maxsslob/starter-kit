/*REQUIRE*/
'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import concat from 'gulp-concat'
import useref from 'gulp-useref'
import uglify from 'gulp-uglify'
import gulpIf from 'gulp-if'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'
import del from 'del'
import runSequence from'run-sequence'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'


browserSync.create()


/*IMAGES*/
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(imagemin({
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

/*SASS*/
gulp.task('sass', function(){
  return gulp.src('app/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('/styles.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('templates', function() {
 
  return gulp.src('app/views/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('js', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/*WATCH*/
gulp.task('watch', ['browserSync', 'sass', 'templates', 'js'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/views/*.html', ['templates']); 
  gulp.watch('app/js/*.js', ['js']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
})

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

//gulp clean:dist t oclean the directory
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass','templates' , 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'templates', 'useref', 'js', 'browserSync', 'watch'],
    callback
  )
})