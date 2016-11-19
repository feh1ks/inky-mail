var gulp = require('gulp'),                      // Gulp JS
    imagemin = require('gulp-imagemin'),         // Minify images
    inky = require('inky'),                      // Minify images
    csso = require('gulp-csso'),                 // Minify CSS
    autoprefixer = require('gulp-autoprefixer'), // Gulp autoprefixer
    include = require('gulp-include'),           // HTML Templates
    less = require('gulp-less'),                 // Less compiler
    rename = require("gulp-rename");             // Rename files

/*---------------------------------------------------------------------------------*/
/*------------------------------ COMPRESS IMAGES ----------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('compressImages', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);
/*---------------------------------------------------------------------------------*/
/*----------------------------- CSS PREPROCESSORS ---------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('cssPreprocessor', function() {
    return gulp.src(['src/less/style.less',
					 'src/less/bootstrap.less',
					 'src/less/plugins.less'])
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist/css'))
});
/*---------------------------------------------------------------------------------*/
/*--------------------------- HTML INCLUDES => INKY -------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task("includes", function() {
    gulp.src("src/index.html")
        .pipe(include())
        .pipe(inky())
        .pipe(gulp.dest("dist/"))
});
/*---------------------------------------------------------------------------------*/
/*---------------------------------- DEFAULT --------------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('default', function(){
    gulp.run('compressImages', 'cssPreprocessor', 'includes');

    // Watch
    gulp.watch("src/**/*", function(event){
        gulp.run('compressImages', 'cssPreprocessor', 'includes');
    });
});
