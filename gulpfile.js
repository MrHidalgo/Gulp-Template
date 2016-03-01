'use strict'

/* NPM PACKAGES
 =================================*/
var gulp            =   require('gulp'),
    mainBowerFiles  =   require('main-bower-files'),    // MAIN BOWER FILES (**.min.**)
    watch           =   require('gulp-watch'),          // WATCH FILE CHANGED
    browserSync     =   require('browser-sync'),        // LIVERELOAD & SERVER PROJECT
    util            =   require('gulp-util'),           // FOR WATCH ERROR
    plumber         =   require('gulp-plumber'),        // ERROR TRAPPING REALTIME
    del             =   require('del'),                 // CLEAN [FOLDER, FILES]
    jade            =   require('gulp-jade'),           // JADE TEMPLATE
    //scss            =   require('gulp-sass'),           // SASS
    less            =   require('gulp-less'),           // LESS
    stylus          =   require('gulp-stylus'),         // STYLUS
    rework          =   require('gulp-rework'),         // REWORK
    //prefixer        =   require('gulp-autoprefixer'),   // AUTOPREFIXER
    sourcemaps      =   require('gulp-sourcemaps'),     // SOURCEMAPS
    uncss           =   require('gulp-uncss'),          // DELETE NOT USED CSS CLASS, ID, TAGS
    prettify        =   require('gulp-prettify'),       // REFORMAT CODE
    htmlhint        =   require("gulp-htmlhint"),       // VALIDATION HTML CODE
    rigger          =   require('gulp-rigger'),         // Rigger is a build time include engine
    //cssmin          =   require('gulp-minify-css'),     // MINIFY CSS FILE
    jsmin           =   require('gulp-uglifyjs'),       // MINIFY JS FILE
    concat          =   require('gulp-concat'),         // CONCAT JS FILES
    jshint          =   require('gulp-jshint'),         // JS HINT
    rename          =   require('gulp-rename'),         // RENAME FILES
    lazypipe        =   require('lazypipe'),            // PARTIAL PIPELINES
    imagemin        =   require('gulp-imagemin'),       // IMG MINIFY
    pngComp         =   require('imagemin-pngquant'),   // IMG COMPRESS
    _if             =   require('gulp-if'),             // IF WITH LAZYPIPE
    reload          =   browserSync.reload;             // RELOAD


/* OBJECT PATH & COMMANDS
 =================================*/
var path            =   require('./gulp-files/gulp-path.js'),
    commands        =   require('./gulp-files/gulp-command.js'),
    template        =   require('./gulp-files/gulp-template.js'),
    task            =   require('./gulp-files/gulp-task.js');

//console.log('test : ', template.test(3));


/* SERVER CONFIG
 =================================*/
var config = {
    server: {
        baseDir :   './dist'
    },
    tunnel      :   'lucky',
    online      :   true,
    notify      :   true,
    host        :   'localhost',
    port        :   1234,
    logPrefix   :   'FrontEnd Server'
};



/* WEB-SERVER
 =================================*/
gulp.task(commands.server, function() {
    browserSync(config);
});


/* CLEAN FOLDER PROJECT
 =================================*/
gulp.task(commands.cleanGlobal, function() {
    del.sync(path.clean);
});
gulp.task(commands.cleanHtml, function() {
    del.sync(path.cleanHtml);
});
gulp.task(commands.cleanStyle, function() {
    del.sync(path.cleanStyle);
});
gulp.task(commands.cleanScript, function() {
    del.sync(path.cleanScript);
});
gulp.task(commands.cleanImage, function() {
    del.sync(path.cleanImage);
});


/* WATCH FILES FOR RELOAD & SYNC
 =================================*/
gulp.task(commands.watch, function(){
    watch(
        [
            //path.watch.jade,
            //path.watch.jadeWatch,
            //path.watch.scss,
            //path.watch.scssWatch,
            //path.watch.font,
            //path.watch.script
        ],
        function() {
            gulp.start(commands.build);
        });
});


/* MAIN BOWER FILES
 =================================*/
gulp.task(commands.bowerJquery, function() {
    var main = gulp.src(mainBowerFiles(
        {
            overrides: {
                jquery : {
                    main : [
                        commands.bowerJqueryMin
                    ]
                }
            }
        }
        ))
        .pipe(gulp.dest(commands.bowerJqueryPath))

    return main;
});


/*
 IMAGE build
==============================*/
gulp.task(commands.buildImg, function() {
    gulp.src(
        path.src.image
        )
        .pipe(imagemin({
                progressive :   true,
                interlaced  :   true
            }))
        .pipe(pngComp({
                quality     : '65-80',
                speed       : 3
            })())
        .pipe(
            gulp.dest(path.dist.image)
        )
});


/*
 SCRIPT build
 ==============================*/
gulp.task(commands.buildScript, function () {
    gulp.src(
        path.src.script
        )
        .pipe(jshint())
        .pipe(plumber({
                errorHundler : reportError
            }))
        .pipe(concat('**.js'))
        .pipe(jsmin())
        .pipe(rename(
            commands.renameScript)
        )
        .pipe(reloadTemplate())
        .pipe(
            gulp.dest(path.dist.script)
        )
        .on(commands.error, template.reportError)
});

/*
 FUNCTION FONT CALL:
     SCSS:
     - commands.buildScssFont && path.src.scssFont;
     LESS:
     - commands.buildLessFont && path.src.lessFont;
     STYLUS:
     - commands.buildStylusFont && path.src.stylusFont;
 FUNCTION STYLE CALL:
     SCSS:
     - commands.buildScss && path.src.scss;
     LESS:
     - commands.buildLess && path.src.less;
     STYLUS:
     - commands.buildStylus && path.src.stylus;
==============================*/
task.styleMainTask('style', commands.buildScss, path.src.scss);



/*
 FUNCTION CALL:
 HTML:
 - commands.buildHtml;
 - path.src.html;
 JADE:
 - commands.buildJade;
 - path.src.jade;
 ==============================*/
task.htmlMainTask('html', commands.buildHtml, path.src.html);



/*
 TASK FOR MAIN FILES
 ==============================*/
{
    gulp.task(commands.buildMainFiles,
        [
            //JQUERY
            commands.bowerJquery
        ]
    );
}


/*
 MAIN BUILD "ALL TASK"
 ==============================*/
{
    gulp.task(commands.build,
        [
            //commands.buildJade,
            //commands.buildScss,
            //commands.buildFont,
            //commands.buildScript
        ]
    );
}


/* MAIN TASK FOR PROJECT
 =================================*/
{
    gulp.task(commands.buildMain,
        [
            commands.build,
            commands.server,
            commands.watch
        ]
    );
}