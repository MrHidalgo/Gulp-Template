var gulp        =   require('gulp'),
    lazypipe    =   require('lazypipe'),            // LAZYPIPE
    rigger      =   require('gulp-rigger'),         // HTML
    htmlhint    =   require('gulp-htmlhint'),
    jade        =   require('gulp-jade'),           // JADE
    prettify    =   require('gulp-prettify'),
    path        =   require('./gulp-path.js'),      // OBJECT PATH & COMMANDS
    commands    =   require('./gulp-command.js'),
    prefixer    =   require('gulp-autoprefixer'),   // CSS
    scss        =   require('gulp-sass'),
    uncss       =   require('gulp-uncss'),
    cssmin      =   require('gulp-minify-css'),
    rename      =   require('gulp-rename'),         // RENAME
    browserSync =   require('browser-sync'),        // RELOAD
    reload      =   browserSync.reload;

/*
 TEMPLATE BLOCK [notify, reload]
 ==============================*/
{
    var reloadTemplate = lazypipe()
        .pipe( function() {
            return reload({
                stream: true
            });
        })
}
/*
 TEMPLATE BLOCK FOR HTML
 ==============================*/
{
    var htmlOptions = lazypipe()
        .pipe(rigger)
        .pipe(htmlhint)
        .pipe(htmlhint.reporter)
}
/*
 TEMPLATE BLOCK FOR JADE
 ==============================*/
{
    var jadeOptions = lazypipe()
        .pipe( function() {
            var YOUR_LOCALS = {};

            return jade({
                locals      :   YOUR_LOCALS
            });
        })
        .pipe( function() {
            return prettify({
                indent_size :   4
            })
        })
}
/*
 TEMPLATE BLOCK FOR SASS
 ==============================*/
{
    var optionsScssTemplate = lazypipe()
        .pipe( function() {
            return scss({
                sourceMap        : true,
                errLogToConsole  : true,
                outputStyle      : 'compressed'
            });
        })
}
/*
 TEMPLATE BLOCK FOR FONT STYLE
 ==============================*/
{
    var styleFontOptions = lazypipe()
        .pipe( function() {
            return rename(
                commands.renameStyleFont
            )
        })
        .pipe(reloadTemplate)
        .pipe(
            gulp.dest, path.dist.font
        )
}
/*
 TEMPLATE BLOCK FOR STYLE
 ==============================*/
{
    var styleFileOptions =lazypipe()
        .pipe( function() {
            return prefixer({
                    browsers    : ['last 3 versions'],
                    cascade     : true
                })
        })
        .pipe( function() {
            return uncss({
                    html        : './dist/index.html'
                })
        })
        .pipe( function() {
            return cssmin({
                    compatibility    : 'ie9'
                })
        })
        .pipe( function() {
            return rename(
                commands.renameStyle
            )
        })
        .pipe(reloadTemplate)
        .pipe(
            gulp.dest, path.dist.style
        )
}

/*
 MODULE EXPORTS...
 ==============================*/
module.exports.reloadTemplate       = reloadTemplate;
module.exports.htmlOptions          = htmlOptions;
module.exports.jadeOptions          = jadeOptions;
module.exports.optionsScssTemplate  = optionsScssTemplate;
module.exports.styleFontOptions     = styleFontOptions;
module.exports.styleFileOptions     = styleFileOptions;