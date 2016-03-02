'use strict'

/* NPM PACKAGES
 =================================*/
var gulp            =   require('gulp'),
    mainBowerFiles  =   require('main-bower-files'),    // MAIN BOWER FILES (**.min.**)
    watch           =   require('gulp-watch'),          // WATCH FILE CHANGED
    browserSync     =   require('browser-sync'),        // LIVERELOAD & SERVER PROJECT
    del             =   require('del');                 // CLEAN [FOLDER, FILES]


/* OBJECT PATH & COMMANDS [module]
 =================================*/
var path            =   require('./gulp-files/gulp-path.js'),       // PATH.. [/src, /dist, /watch, /clean]
    commands        =   require('./gulp-files/gulp-command.js'),    // COMMANDS.. [main commands for gulp..]
    template        =   require('./gulp-files/gulp-template.js'),   // TEMPLATE.. [lazypipe..]
    task            =   require('./gulp-files/gulp-task.js');       // TASK.. [main task for gulp..]


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
            path.watch.html,
            path.watch.htmlWatch,
            path.watch.scss,
            path.watch.scssWatch,
            path.watch.script
        ],
        function(event, cb) {
            gulp.start(commands.build);
        });
});


/* MAIN BOWER FILES
 =================================*/
gulp.task(commands.bowerJquery, function() {
    gulp.src(mainBowerFiles(
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
});


/*
 FUNCTION FONT CALL:
     SCSS || LESS || STYLUS :
        - commands.build+{Scss || Less || Stylus}+Font && path.src.+{scss || less || stylus}+Font;
 FUNCTION STYLE CALL:
        - commands.build+{Scss || Less || Stylus} && path.src.+{scss || less || stylus};
 OPTIONS:
    - style || font;
 ==============================*/
task.styleMainTask('style', commands.buildScss, path.src.scss);


/*
 FUNCTION HTML/HTML-PREPROCESSOR CALL:
     HTML:
         - commands.build+{Html || Jade} && path.src.+{html || jade};
 OPTIONS:
    - html || jade;
 ==============================*/
task.htmlMainTask('html', commands.buildHtml, path.src.html);


/*
 FUNCTION IMAGE CALL:
    - commands.buildImg && path.src.image;
 ==============================*/
task.mainImageTask(commands.buildImg, path.src.image);


/*
 FUNCTION SCRIPT CALL:
    - commands.buildScript && path.src.script;
 ==============================*/
task.mainScriptTask(commands.buildScript, path.src.script);


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
 MAIN BUILD "ALL TASK":
    - commands.buildHtml || commands.buildJade;
    - commands.buildScss || commands.buildLess || commands.buildStylus;
 ==============================*/
{
    gulp.task(commands.build,
        [
            commands.buildHtml,
            commands.buildScss,
            commands.buildScript
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