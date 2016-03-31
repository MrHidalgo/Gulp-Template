var gulp            =   require('gulp'),
    lazypipe        =   require('lazypipe'),            // LAZYPIPE
    rigger          =   require('gulp-rigger'),         // HTML
    htmlhint        =   require('gulp-htmlhint'),
    jade            =   require('gulp-jade'),           // JADE
    path            =   require('./gulp-path.js'),      // OBJECT PATH & COMMANDS
    commands        =   require('./gulp-command.js'),
    configuration   =   require('./gulp-config.js'),    // CONFIGURATION FILE
    prefixer        =   require('gulp-autoprefixer'),   // CSS
    scss            =   require('gulp-sass'),
    uncss           =   require('gulp-uncss'),
    cssmin          =   require('gulp-minify-css'),
    rename          =   require('gulp-rename'),         // RENAME
    browserSync     =   require('browser-sync'),        // RELOAD
    reload          =   browserSync.reload;


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
            return jade(
                configuration.mainConfig.jade
            );
        })
}
/*
 TEMPLATE BLOCK FOR SASS
 ==============================*/
{
    var optionsScssTemplate = lazypipe()
        .pipe( function() {
            return scss(
                configuration.mainConfig.scss.sourceMap
            );
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
            return prefixer(
                configuration.mainConfig.scss.stylize.pref
            )
        })
        //.pipe( function() {
        //    return uncss(
        //        configuration.mainConfig.scss.stylize.unstyle
        //    )
        //})
        .pipe( function() {
            return cssmin(
                configuration.mainConfig.scss.stylize.minify
            )
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
module.exports.reloadTemplate       =   reloadTemplate;
module.exports.htmlOptions          =   htmlOptions;
module.exports.jadeOptions          =   jadeOptions;
module.exports.optionsScssTemplate  =   optionsScssTemplate;
module.exports.styleFontOptions     =   styleFontOptions;
module.exports.styleFileOptions     =   styleFileOptions;