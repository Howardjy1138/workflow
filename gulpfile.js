/**
 * Created by Hao on 1/26/2017.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify =require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var SOURCEPATHS = {
  sassSource : 'src/scss/*.scss',
    htmlSource:'src/*.html',
    jsSouorce:'src/js/**'
};
var APPPATH = {
    root:'app/',
    css:'app/css',
    js:'app/js'
};
gulp.task('clean-html',function () {
    return gulp.src(APPPATH.root +'/*.html',{read:false,force:true})
        .pipe(clean());
});
gulp.task('clean-scripts',function () {
    return gulp.src(APPPATH.js +'/**',{read:false,force:true})
        .pipe(clean());
});
gulp.task('sass',function () {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});
gulp.task('scripts',['clean-scripts'],function () {
    gulp.src(SOURCEPATHS.jsSouorce)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(APPPATH.js))
});
gulp.task('copy',['clean-html'],function () {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root))
});
gulp.task('serve',['sass'],function(){
    browserSync.init([APPPATH.css + '/*.css',APPPATH.root +'/*.html',APPPATH.js+'/*.js'],{
        server:{
            baseDir : APPPATH.root
        }
    })
});
gulp.task('watch',['serve','sass','copy','clean-html','clean-scripts','scripts'],function () {
    gulp.watch([SOURCEPATHS.sassSource],['sass']);
    gulp.watch([SOURCEPATHS.htmlSource],['copy']);
    gulp.watch([SOURCEPATHS.jsSouorce],['scripts']);
});
gulp.task('default',['watch']);