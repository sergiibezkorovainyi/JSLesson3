"use strict";
// Импортируем зависимости которые используем при сборке
// npm install gulpjs/gulp#4.0 --save-dev

// Сам галп
const gulp = require('gulp');
// Расширение для дебага, вывод сообщений в потоке обработки
const debug = require('gulp-debug');
// Расширение для удаления
const del = require('del');
// Concat & Rename -> объединение файлов в один и ренейм
const concat = require('gulp-concat');
const rename = require("gulp-rename");
// Расширения для стилей - автопрефиксер, препроцессор less, замена урлов для спрайтов
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const svgSprite = require('gulp-svg-sprite');
const urlAdjuster = require('gulp-css-url-adjuster');
// Синхронизация браузера с средой разработки
const browserSync = require('browser-sync').create();

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**')
      .pipe( debug({ file: 'name:' }) )
      .pipe( gulp.dest('public') );
});

gulp.task('js', function(){
    return gulp.src('frontend/js/**/*.js')
      .pipe( debug({ js: ''}) )
      .pipe( concat('main.min.js'))
      .pipe( gulp.dest('public/js') );
});

gulp.task('styles', function(){
    return gulp.src('frontend/styles/*.less', {base: 'frontend'})
      .pipe( less() )
      .pipe( autoprefixer({ cascade: true }) )
      .pipe( concat('style.min.css') )
      .pipe( gulp.dest('public/css') );
});

gulp.task('watch', function() {
  gulp.watch( 'frontend/styles/**/*.less', gulp.series( 'styles' ) );
  gulp.watch( 'frontend/assets/**/*.*',    gulp.series( 'assets' ) );
  gulp.watch( 'frontend/js/**/*.js',       gulp.series( 'js' ) );
});

gulp.task('serve', function(){
  browserSync.init({
    server: "public",
    port: 8081
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload );
});

gulp.task('clean', function(){
    return del(['public/', 'frontend/tmp']);
});
gulp.task('build', gulp.series('clean', 'assets', 'js', 'styles'));

gulp.task('dev',
  gulp.series('build',
    gulp.parallel('watch', 'serve')
  )
);