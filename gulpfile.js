'use strict'

/* NPM PACKAGES
 =================================*/
var gulp            =   require('gulp'),
    mainBowerFiles  =   require('main-bower-files'),    // MAIN BOWER FILES (**.min.**)
    watch           =   require('gulp-watch'),          // WATCH FILE CHANGED
    browserSync     =   require('browser-sync'),        // LIVERELOAD & SERVER PROJECT
    util            =   require('gulp-util'),           // FOR WATCH ERROR
    plumber         =   require('gulp-plumber'),        // ERROR TRAPPING REALTIME
    jshint          =   require('gulp-jshint'),         // JS HINT
    del             =   require('del'),                 // CLEAN [FOLDER, FILES]
    jade            =   require('gulp-jade'),           // JADE TEMPLATE
    scss            =   require('gulp-sass'),           // SASS
    prefixer        =   require('gulp-autoprefixer'),   // AUTOPREFIXER
    sourcemaps      =   require('gulp-sourcemaps'),     // SOURCEMAPS
    prettify        =   require('gulp-prettify'),       // REFORMAT CODE
    cssmin          =   require('gulp-minify-css'),     // MINIFY CSS FILE
    jsmin           =   require('gulp-uglifyjs'),       // MINIFY JS FILE
    rename          =   require('gulp-rename'),         // RENAME FILES
    lazypipe        =   require('lazypipe'),            // PARTIAL PIPELINES
    reload          =   browserSync.reload;             // RELOAD


/* PATH FOR FILES
 =================================*/
var path = {

    // FINISH FILE PROJECT
    dist: {
        //
        jade    :   './dist/',
        scss    :   './dist/style/',
        font    :   './dist/style/',
        script  :   './dist/script/'
    },

    // WORK FILES
    src: {
        //
        jade    :   './src/index.jade',
        scss    :   './src/sassTemplate/**.scss',
        font    :   './src/sassTemplate/_font/**.scss',
        script  :   './src/script/**.js'
    },

    // STREAM/WATCH FILE
    watch:{
        //
        jade        :   './src/**.jade',
        jadeWatch   :   './src/**/**.jade',
        scss        :   './src/sassTemplate/**.scss',
        scssWatch   :   './src/sassTemplate/**/**.scss',
        font        :   './src/sassTemplate/_font/**.scss',
        script      :   './src/script/**.js'
    },

    // CLEAN FOLDER
    clean       :   './dist/*',
    cleanScript :   './dist/script/*',
    cleanStyle  :   './dist/style/*',
    cleanHtml   :   './dist/*.html'
};


/* TEXT EXAMPLE
 =================================*/
var textExample = {

    //SERVER
    server          :   'server',
    tunnel          :   'tunnel',

    //WATCH FILE
    watch           :   'watch',

    //BUILD PROJECT FILES
    build           :   'build',
    buildMain       :   'main',
    buildJade       :   'build:jade',
    buildScss       :   'build:scss',
    buildFont       :   'build:font',
    buildScript     :   'build:script',
    buildMainFiles  :   'mainFiles',

    //CLEAN PROJECT FILES
    cleanGlobal     :   'clean:global',
    cleanScript     :   'clean:script',
    cleanStyle      :   'clean:style',
    cleanHtml       :   'clean:html',
    cleanProject    :   'clean:project',

    //MAIN BOWER FILES
    bowerJquery     :   'main:jquery',
    bowerJqueryMin  :   './dist/jquery.min.js',
    bowerJqueryPath :   './dist/script',

    //RENAME FILES
    renameScript    :   'script.min.js',
    renameStyle     :   'style.min.css',

    //ERROR
    error           :   'error'
};


/* SERVER CONFIG
 =================================*/
var config = {
    server: {
        baseDir :   './dist'
    },
    tunnel      :   'lucly',
    online      :   true,
    notify      :   true,
    host        :   'localhost',
    port        :   1234,
    logPrefix   :   'FrontEnd Server'
};


/* ERROR
 =================================*/
var reportError = function(error) {
    var lineNumber  = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '',
        report      = '',
        chalk       = util.colors.white.bgRed;

    notify(
        {
            title       : 'Task Failed [' + error.plugin + ']',
            message     : lineNumber + 'See console.'
        }
    ).write(error);

    report  =   chalk('TASK: ') + ' [' + error.plugin + ']\n';
    report  =   chalk('PROB: ') + ' ' + error.message + '\n';

    if (error.lineNumber) {
        report +=   chalk('LINE: ') + ' ' + error.lineNumber + '\n';
    }
    if (error.fileName) {
        report +=   chalk('FILE: ') + ' ' + error.fileName + '\n';
    }

    console.error(report);
    this.emit('end');
};


/*
 TEMPLATE BLOCK [notify, reload]
 ==============================*/
var reloadTemplate = lazypipe()
    .pipe( function() {
        return reload(
            {
                stream: true
            }
        );
    })


/*
 TEMPLATE BLOCK SASS
 ==============================*/
var optionsScssTemplate = lazypipe()
    .pipe( function() {
        return scss(
            {
                sourceMap        : true,
                errLogToConsole  : true,
                outputStyle      : 'compressed'
            }
        );
    })


/* WEB-SERVER
 =================================*/
gulp.task(textExample.server, function() {
    browserSync(config);
});


/* CLEAN FOLDER PROJECT
 =================================*/
gulp.task(textExample.cleanGlobal, function() {
    del.sync(path.clean);
});
gulp.task(textExample.cleanHtml, function() {
    del.sync(path.cleanHtml);
});
gulp.task(textExample.cleanStyle, function() {
    del.sync(path.cleanStyle);
});
gulp.task(textExample.cleanScript, function() {
    del.sync(path.cleanScript);
});


/* WATCH FILES FOR RELOAD & SYNC
 =================================*/
gulp.task(textExample.watch, function(){
    watch(
        [
            path.watch.jade,
            path.watch.jadeWatch,
            path.watch.scss,
            path.watch.scssWatch,
            path.watch.font,
            path.watch.script
        ],
        function() {
            gulp.start(textExample.build);
        });
});


/* MAIN BOWER FILES
 =================================*/
gulp.task(textExample.bowerJquery, function() {
    var main = gulp.src(mainBowerFiles(
        {
            overrides: {
                jquery : {
                    main : [
                        textExample.bowerJqueryMin
                    ]
                }
            }
        }
        ))
        .pipe(gulp.dest(textExample.bowerJqueryPath))

    return main;
});


/*
 SCRIPT build
 ==============================*/
gulp.task(textExample.buildScript, function () {
    gulp
        .src(
            path.src.script
        )
        .pipe(jshint())
        .pipe(plumber(
            {
                errorHundler : reportError
            }
        ))
        .pipe(
            jsmin()
        )
        .pipe(
            rename(textExample.renameScript)
        )
        .pipe(
            reloadTemplate()
        )
        .pipe(
            gulp.dest(
                path.dist.script
            )
        )
        .on(textExample.error, reportError)
});

/*
 SCSS FONT build
 ==============================*/
gulp.task(textExample.buildFont, function() {
    gulp
        .src(
            path.src.font
        )
        .pipe(plumber(
            {
                errorHundler : reportError
            }
        ))
        .pipe(
            sourcemaps.init()
        )
        .pipe(
            optionsScssTemplate()
        )
        .pipe(
            sourcemaps.write()
        )
        .pipe(
            reloadTemplate()
        )
        .pipe(
            gulp.dest(
                path.dist.font
            )
        )
        .on(textExample.error, reportError)
});


/*
 SCSS FILES build
 ==============================*/
gulp.task(textExample.buildScss, function() {
    gulp
        .src(
            path.src.scss
        )
        .pipe(plumber(
            {
                errorHundler : reportError
            }
        ))
        .pipe(
            sourcemaps.init()
        )
        .pipe(
            optionsScssTemplate()
        )
        .pipe(
            prefixer(
                {
                    browsers         : ['last 3 versions'],
                    cascade          : true
                }
            ))
        .pipe(
            sourcemaps.write()
        )
        .pipe(
            cssmin(
                {
                    compatibility    : 'ie9'
                }
            ))
        .pipe(
            rename(textExample.renameStyle)
        )
        .pipe(
            reloadTemplate()
        )
        .pipe(
            gulp.dest(
                path.dist.scss
            )
        )
        .on(textExample.error, reportError)
});


/*
 BUILD JADE TEMPLATE
 ==============================*/
gulp.task(textExample.buildJade, function() {
    var YOUR_LOCALS = {};

    gulp
        .src(
            path.src.jade
        )
        .pipe(plumber(
            {
                errorHundler : reportError
            }
        ))
        .pipe(
            jade(
                {
                    locals      :   YOUR_LOCALS
                }
            ))
        .pipe(
            prettify(
                {
                    indent_size :   4
                }
            ))
        .pipe(
            reloadTemplate()
        )
        .pipe(
            gulp.dest(
                path.dist.jade
            )
        )
        .on(textExample.error, reportError)
});


/*
 TASK FOR MAIN FILES
 ==============================*/
gulp.task(textExample.buildMainFiles,
    [
        //JQUERY
        textExample.bowerJquery
    ]
);


/*
 MAIN BUILD "ALL TASK"
 ==============================*/
gulp.task(textExample.build,
    [
        textExample.buildJade,
        textExample.buildScss,
        textExample.buildFont,
        textExample.buildScript
    ]
);


/* MAIN TASK FOR PROJECT
 =================================*/
gulp.task(textExample.buildMain,
    [
        textExample.build,
        textExample.server,
        textExample.watch
    ]
);