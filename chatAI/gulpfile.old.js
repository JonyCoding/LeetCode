var gulp = require('gulp'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	imports = require('gulp-imports'),
	clean = require('gulp-clean'),
	browserSync = require("browser-sync").create(),
	reload = browserSync.reload,
	distPath = '../Public/' + __dirname.split("\\").pop() + '/';

console.log(distPath);
//default
gulp.task('default', ['browser-sync']);

//jade文件编译
gulp.task('jade', function () {
	return gulp.src('src/*.jade ').pipe(plumber({
		errorHandler: notify.onError(function (error) {
			process.stdout.write('\x07');
			return {
				title: 'Gulp Error!',
				message: "\n\n" + error.message + "\n"
			};
		})
	})).pipe(jade({
		pretty: true
	})).pipe(gulp.dest(distPath))
});

//less文件编译合并
gulp.task('less', function () {
	return gulp.src('src/css/*.less').pipe(plumber({
		errorHandler: notify.onError(function (error) {
			process.stdout.write('\x07');
			return {
				title: 'Gulp Error!',
				message: "\n\n" + error.message + "\n"
			};
		})
	})).pipe(less()).pipe(gulp.dest(distPath + 'css'))
});

//合并main.css和style.css忽略lib.css
gulp.task('concat', ['less'], function () {
	return gulp.src([
		distPath + 'css/main.css',
		distPath + 'css/style.css'
	]).pipe(concat('main.css')).pipe(gulp.dest(distPath + 'css'))
})

//js文件导入合并
gulp.task('js', function () {
	return gulp.src(['src/js/*.js']).pipe(imports()).pipe(gulp.dest(distPath + 'js'));
});

//图片搬运
gulp.task('image', function () {
	return gulp.src('src/img/**').pipe(gulp.dest(distPath + 'img/'));
});

//图片搬运
gulp.task('fonts', function () {
	return gulp.src('src/css/fonts/**').pipe(gulp.dest(distPath + 'css/fonts'));
});

// 静态服务器
gulp.task('browser-sync', [
	'less', 'concat', 'js', 'image','fonts','jade'
], function () {
	browserSync.init({
		server: {
			baseDir: distPath
		},
		port: 8080,
		notify: false
	});
	gulp.watch("src/*.jade", ['jade']);
	gulp.watch("src/css/*", ['concat', 'jade']);
	gulp.watch("src/css/fonts/*",['fonts','jade']);
	gulp.watch("src/js/*", ['js', 'jade']);
	gulp.watch("src/img/*", ['image', 'jade']);
	gulp.watch(distPath + "*").on('change', reload);
	gulp.watch(distPath + "*/*.*").on('change', reload);
});

//dist
gulp.task('dist', ['concat', 'js', 'image','fonts', 'jade']);

//删除Public文件夹
gulp.task('clean', function () {
	return gulp.src(distPath).pipe(clean({
		force: true
	}))
});
