var gulp = require("gulp"),
	jade = require("gulp-jade"),
	less = require("gulp-less"),
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	concat = require("gulp-concat"),
	imports = require("gulp-imports"),
	clean = require("gulp-clean"),
	watch = require("gulp-watch"),
	preprocess = require("gulp-preprocess"),
	babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	// filter = require('gulp-filter'),
	debug = true,
	browserSync = require("browser-sync").create(),
	$reload = browserSync.reload,
	distPath = "../Public/dist/";
	tbuilder = require("./gulp-tbuilder");

function $jade() {
	return gulp
		.src(["src/*.jade", "src/**/*.jade"])
		.pipe(
			plumber({
				errorHandler: notify.onError(function (error) {
					process.stdout.write("\x07");
					return {
						title: "Gulp Error!",
						message: "\n\n" + error.message + "\n",
					};
				}),
			})
		)
		.pipe(
			jade({
				pretty: true,
			})
		)
		.pipe(gulp.dest(distPath));
}

function $less() {
	return gulp
		.src(["src/css/lib.less", "src/css/main.less", "src/css/*.less"])
		.pipe(
			plumber({
				errorHandler: notify.onError(function (error) {
					process.stdout.write("\x07");
					return {
						title: "Gulp Error!",
						message: "\n\n" + error.message + "\n",
					};
				}),
			})
		)
		.pipe(less())
		.pipe(gulp.dest(distPath + "css"));
}

function $concat() {
	return gulp
		.src([distPath + "css/main.css", distPath + "css/style.css"])
		.pipe(concat("main.css"))
		.pipe(gulp.dest(distPath + "css"));
}
function $vue() {
	return gulp
		.src(["src/components/**/*.vue"])
		.pipe(tbuilder())
		.pipe(
			rename(function (path) {
				// Updates the object in-place
				// path.dirname += "/ciao";
				// path.basename += "-goodbye";
				path.extname = ".js";
			})
		)
		.pipe(gulp.dest(distPath + "js/components"));
}

function $js() {
	return gulp
		.src(["src/js/**"])
		.pipe(
			preprocess({
				context: {
					DEBUG: debug,
				},
			})
		)
		.pipe(imports())
		.pipe(gulp.dest(distPath + "js"));
}

function $image() {
	gulp.src("src/*.ico").pipe(gulp.dest(distPath));
	return gulp.src("src/img/**").pipe(gulp.dest(distPath + "img"));
}

function $fonts() {
	return gulp.src("src/css/fonts/**").pipe(gulp.dest(distPath + "css/fonts"));
}

function $clean() {
	return gulp.src(distPath).pipe(
		clean({
			force: true,
		})
	);
}

function $reload(done) {
	console.log("reload!");
	reload();
	done();
}

function $files() {
	return gulp.src("src/files/**").pipe(gulp.dest(distPath + "files"));
}

function $bs() {
	browserSync.init({
		server: {
			baseDir: distPath,
		},
		port: 8000,
		notify: false,
	});

	gulp.watch(
		"src/template/*.jade",
		{
			delay: 10,
		},
		gulp.series($jade, $js, $reload)
	);

	gulp.watch(
		"src/components/*.vue",
		{
			delay: 10,
		},
		gulp.series($vue, $reload)
	);

	gulp.watch(
		["src/**/*.jade", "src/template/*.jade"],
		{
			delay: 10,
		},
		gulp.series($jade, $reload)
	);

	gulp.watch(
		"src/**/*.js",
		{
			delay: 10,
		},
		gulp.series($js, $reload)
	);
	gulp.watch(
		"src/css/**",
		{
			delay: 10,
		},
		gulp.series($less, $reload)
	);
	gulp.watch(
		"src/img/**",
		{
			delay: 10,
		},
		gulp.series($image, $reload)
	);
	gulp.watch(
		"src/files/**",
		{
			delay: 10,
		},
		gulp.series($files, $reload)
	);
	gulp.watch(
		"src/css/fonts/**",
		{
			delay: 10,
		},
		gulp.series($fonts, $reload)
	);
}

function $pro(done) {
	debug = false;
	return done();
}

exports.default = gulp.series($less, gulp.parallel($js, $vue, $image, $fonts, $jade, $files), $bs);
// exports.default = gulp.series($vue);
exports.vue = gulp.series($vue);
exports.clean = $clean;
exports.dist = gulp.series($pro, $less, gulp.parallel($js, $vue, $image, $fonts, $jade, $files));
