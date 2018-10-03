var gulp = require("gulp");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var sass = require("gulp-sass");
var ejs = require("gulp-ejs");
var autoprefixer = require("gulp-autoprefixer");
var cache = require('gulp-cached');
var merge = require('merge-stream');
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant')
var mozjpeg = require('imagemin-mozjpeg')
var changed  = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');

var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var historyApi = require('connect-history-api-fallback');

var config = {
  watchFiles: './app/react/*.js',
  entryFile: './app/react/index.js',
  destDir: './public/scripts/',
  destFile: 'index.js',
};

/*--------------------- ejs [ejs] --------------------*/
gulp.task('ejs', function() {
  var under = gulp.src(["./app/views/**/*.ejs" , './app/views/partial/*.ejs'])
    .pipe(cache( 'ejs' ))
    .pipe(plumber())
    .pipe(ejs({ msg: 'compiled!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./public/'))

    var top =  gulp.src('./app/views/index.ejs')
    .pipe(ejs({ msg: 'compiled!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./public/'))
    .pipe(browser.reload({stream:true}));

    return merge(under, top);
});

/*--------------------- sass [sass] --------------------*/
gulp.task("sass", function() {
  gulp.src("./app/stylesheets/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({pretty: true}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./public/css/"))
    .pipe(browser.reload({stream:true}));
    });

/*--------------------- JavaScript [jsmin] --------------------*/
gulp.task("jsmin", function() {
    gulp.src("./app/javascripts/*.js")
        .pipe(changed( 'jsmin' ))
        .pipe(plumber())
        .pipe(uglify())
        .pipe( rename({
          extname: '.min.js'
        }) )
        .pipe(gulp.dest("./public/js/"))
        .pipe(browser.reload({stream:true}))
});

/*--------------------- React.js [react] --------------------*/
gulp.task("react", function() {
  browserify(config.entryFile, {debug: true})
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .on("error", function (err) {console.log("ERROR: " + err.message);})
    .pipe(source(config.destFile))
    .pipe(gulp.dest(config.destDir))
    .pipe(browser.reload({stream:true}));
    // return gulp.src('./app/react/index.js')
    // .pipe(plumber())
    // .pipe(sourcemaps.init()) /* ソースマップを出力させる場合 */
    // .pipe(babel())
    // .pipe(sourcemaps.write(".")) /* ソースマップを出力させる場合 */
    // .pipe(gulp.dest('./public/scripts/'));
  });


/*--------------------- image [imagemin] --------------------*/
gulp.task("imagemin", function () {
  gulp.src("./app/images/**/*.+(jpg|jpeg|png|gif|svg)")
    .pipe(changed('./public/img/'))
    .pipe(imagemin([
      pngquant({ quality: '65-80', speed: 1 }),
      mozjpeg({ quality: 75 }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest("./public/img/"));
});

/*--------------------- browser sync [server] --------------------*/
gulp.task("server", function() {
    browser({
        server: {
            baseDir: ["./public/"],
            middleware: [historyApi()]
        },

         ghostMode: {
          location: true
        }
    });
});

/*--------------------- watch --------------------*/
gulp.task('watch', function () {
    gulp.watch(['./app/views/**/*.ejs','./app/views/partial/*.ejs'],['ejs']);
    gulp.watch("./app/**/*.scss", ['sass']);
    gulp.watch("./app/javascripts/*.js", ['jsmin']);
    gulp.watch(["./app/react/*.js","./app/react/*/*.js","./app/react/*/*/*.js","./app/react/*/*/*/*.js"] , ['react']);
});

/*--------------------- default [gulp] --------------------*/
gulp.task('default', ['server' , 'watch' ,'imagemin' ,'ejs', 'sass', 'react'] );
