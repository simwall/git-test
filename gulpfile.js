/**
 * Created by SimGarrtte on 7/11/16.
 */

'use strict'

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-sync');
//1、Less编译、压缩、--- 合并 --

var cssnano = require('gulp-cssnano');
gulp.task('style',function(){
    console.log('Less编译、压缩');
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({stream:true}));
});

//2、JS合并、压缩、混淆

gulp.task('js',function(){
    console.log('JS合并、压缩、混淆');
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({stream:true}));
});


// 3、img复制
gulp.task('copyimages',function(){
    console.log('img复制');
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}));
});

//4、html压缩

gulp.task('htmls1',function(){
    console.log('html压缩');
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true,    //去除空格
            removeComments:true         //去除注释
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream:true}));
});


//5、浏览器同步 启动一个web服务器

gulp.task('serve',function(){
    console.log('浏览器同步');
    browserSync({
        //port:2016,
        server:{
            baseDir:"dist/"
        }
    },function(err, bs){
        console.log(bs.options.getIn(["urls","local"]));
    });
    gulp.watch('src/*.html',['htmls1']);
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['js']);
    gulp.watch('src/image/*.*',['copyimages']);
});


//注册一个任务
//监控任务
gulp.task('dist',function(){
    gulp.watch('src/index.html',['copy']);
    gulp.watch('src/styles/*.less',['style']);

})


