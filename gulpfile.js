'use strict'

/* NPM PACKAGES
 =================================*/
var gulp            =   require('gulp'),
    mainBowerFiles  =   require('main-bower-files'),    // MAIN BOWER FILES (**.min.**)
    watch           =   require('gulp-watch'),          // WATCH FILE CHANGED
    browserSync     =   require('browser-sync');        // LIVERELOAD & SERVER PROJECT


/* OBJECT PATH & COMMANDS [module]
 =================================*/
var path            =   require('./gulp-files/gulp-path.js'),       // PATH.. [/src, /dist, /watch, /clean]
    commands        =   require('./gulp-files/gulp-command.js'),    // COMMANDS.. [main commands for gulp..]
    task            =   require('./gulp-files/gulp-task.js'),       // TASK.. [main task for gulp..]
    configuration   =   require('./gulp-files/gulp-config.js');     // CONFIGURATION FILES..


/* WEB-SERVER ---> 'gulp server'
 =================================*/
gulp.task(commands.server, function() {
    browserSync(
        configuration.mainConfig.config
    );
});


/* MAIN BOWER FILES ---> 'gulp main:jquery'
 =================================*/
gulp.task(commands.bowerJquery, function() {
    gulp.src(
        mainBowerFiles(
            configuration.mainConfig.bower
        ))
        .pipe(gulp.dest(
            commands.bowerJqueryPath)
        )
});


/*
 FUNCTION HTML/HTML-PREPROCESSOR CALL:  ---> 'gulp build:jade ||  ---> gulp build:html'
 HTML:
 - commands.build+{Html || Jade} && path.src.+{html || jade};
 OPTIONS:
 - html || jade;
 ==============================*/
task.htmlMainTask('jade', commands.buildJade, path.src.jade);


/*
 FUNCTION FONT CALL:  ---> 'gulp build:scss || gulp build:less || gulp build:stylus'
     SCSS || LESS || STYLUS :
        - commands.build+{Scss || Less || Stylus}+Font && path.src.+{scss || less || stylus}+Font;
 FUNCTION STYLE CALL:
        - commands.build+{Scss || Less || Stylus} && path.src.+{scss || less || stylus};
 OPTIONS:
    - style || font;
 ==============================*/
task.styleMainTask('style', commands.buildScss, path.src.scss);


/*
 FUNCTION SCRIPT CALL:  ---> 'gulp build:script'
 - commands.buildScript && path.src.script;
 ==============================*/
task.mainScriptTask(commands.buildScript, path.src.script);


/*
 FUNCTION IMAGE CALL: ---> 'gulp build:image'
    - commands.buildImg && path.src.image;
 ==============================*/
task.mainImageTask(commands.buildImg, path.src.image);


/*
 FUNCTION SASS DOCUMENTATION: ---> 'gulp doc'
 - commands.sassdoc & path.src.sassdoc;
 ==============================*/
task.sassDocumenation(commands.sassdoc, path.src.sassdoc);


/* WATCH FILES FOR RELOAD & SYNC ---> 'gulp watch'
 =================================*/
gulp.task(commands.watch, function(){
    watch(
        configuration.mainConfig.watchParameters.arr,
        function() {
            gulp.start(
                commands.build
            );
        });
});


/*
 MAIN BUILD "ALL TASK": {in config} ---> 'gulp build'
    - commands.buildHtml || commands.buildJade;
    - commands.buildScss || commands.buildLess || commands.buildStylus;
 ==============================*/
{
    gulp.task(
        commands.build,
        configuration.mainConfig.build.arr
    );
}



/* MAIN TASK FOR PROJECT  ---> 'gulp main'
 =================================*/
{
    gulp.task(
        commands.buildMain,
        configuration.mainConfig.main.arr
    );
}