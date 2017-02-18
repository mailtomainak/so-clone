var wiredep = require('wiredep').stream;
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpInject = require('gulp-inject');
var gulpUglify = require('gulp-uglify');
var gulpCachebust = require('gulp-cachebust');
var jsSourceArray = ['./app/app.js','./app/**/**/**/*.js'];


gulp.task('bower-inject', function () {
  gulp.src('./index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./dist'));    
});

gulp.task('app-scripts-inject',function(){
	gulp.src('./index.html')
	.pipe(gulpInject(gulp.src('./dist/all.js')))
	.pipe(gulp.dest('./dist'));
});

gulp.task('app-minify',function(){
	gulp.src(jsSourceArray)
	.pipe(gulpConcat('all.js'))
	.pipe(gulpUglify({mangle:true}))	
	.pipe(gulp.dest('./dist'));
});


gulp.task('dev',['bower-inject','app-minify','app-scripts-inject']);

