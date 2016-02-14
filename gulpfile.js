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
    scss            =   require('gulp-sass'),           // SASS
    less            =   require('gulp-less'),           // LESS
    stylus          =   require('gulp-stylus'),         // STYLUS
    rework          =   require('gulp-rework'),         // REWORK
    prefixer        =   require('gulp-autoprefixer'),   // AUTOPREFIXER
    sourcemaps      =   require('gulp-sourcemaps'),     // SOURCEMAPS
    uncss           =   require('gulp-uncss'),          // DELETE NOT USED CSS CLASS, ID, TAGS
    prettify        =   require('gulp-prettify'),       // REFORMAT CODE
    htmlhint        =   require("gulp-htmlhint"),       // VALIDATION HTML CODE
    rigger          =   require('gulp-rigger'),         // Rigger is a build time include engine
    cssmin          =   require('gulp-minify-css'),     // MINIFY CSS FILE
    jsmin           =   require('gulp-uglifyjs'),       // MINIFY JS FILE
    concat          =   require('gulp-concat'),         // CONCAT JS FILES
    jshint          =   require('gulp-jshint'),         // JS HINT
    rename          =   require('gulp-rename'),         // RENAME FILES
    lazypipe        =   require('lazypipe'),            // PARTIAL PIPELINES
    imagemin        =   require('gulp-imagemin'),       // IMG MINIFY
    pngComp         =   require('imagemin-pngquant'),   // IMG COMPRESS
    reload          =   browserSync.reload;             // RELOAD


/* PATH FOR FILES
 =================================*/
var path = {
    // FINISH FILE PROJECT
    dist: {
    // JADE
        html        :   './dist/',
    // SCSS & SASS
        style       :   './dist/style/',
        font        :   './dist/style/',
    // SCRIPTS
        script      :   './dist/script/',
    // IMAGE & IMAGE ICON
        image       :   './dist/image/',
        imageIcon   :   './dist/image/icon/'
    },

    // WORK FILES
    src: {
    // JADE
        jade        :   './src/html/JADE/**.jade',
    // HTML
        html        :   './src/html/HTML/**.html',
    // SCSS & SASS
        scss        :   './src/style/SCSS/**.scss',
        scssFont    :   './src/style/SCSS/_fonts/**.scss',
    // LESS
        less        :   './src/style/LESS/**.less',
        lessFont    :   './src/style/LESS/_fonts/**.less',
    // STYLUS
        stylus      :   './src/style/STYLUS/**.styl',
        stylusFont  :   './src/style/STYLUS/_fonts/**.styl',
    // SCRIPTS
        script      :   [
            './src/**/**.js',
            './src/**/**.js'
        ],
    // IMAGE & IMAGE ICON
        image       :   [
            './src/image/**.png',
            './src/image/**.gif',
            './src/image/**.jpg'
        ],
        imageIcon   :   './src/image/_icon/**.png'
    },

    // STREAM/WATCH FILE
    watch:{
    // JADE & JADE WATCH FILE
        jade        :   './src/html/JADE/**.jade',
        jadeWatch   :   './src/html/JADE/**/**.jade',
    // HTML WATCH FILE
        html        :   './src/html/HTML/**.html',
        htmlWatch   :   './src/html/HTML/**/**.html',
    // SASS & SCSS WATCH FILE
        scss        :   './src/style/SCSS/**.scss',
        scssWatch   :   './src/style/SCSS/**/**.scss',
        scssFont    :   './src/style/SCSS/_fonts/**.scss',
    // LESS WATCH FILE
        less        :   './src/style/LESS/**.less',
        lessWatch   :   './src/style/LESS/**/**.less',
        lessFont    :   './src/style/LESS/_fonts/**.less',
    // LESS WATCH FILE
        stylus      :   './src/style/STYLUS/**.styl',
        stylusWatch :   './src/style/STYLUS/**/**.styl',
        stylusFont  :   './src/style/STYLUS/_fonts/**.styl',
    // SCRIPTS
        script      :   './src/**/**.js'
    },

    // CLEAN FOLDER
    clean       :   './dist/*',
    cleanScript :   './dist/script/*',
    cleanStyle  :   './dist/style/*',
    cleanHtml   :   './dist/*.html',
    cleanImage  :   './dist/image/*'
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
    buildMainFiles  :   'mainFiles',

        buildJade       :   'build:jade',

        buildHtml       :   'build:html',

        buildScss       :   'build:scss',
        buildScssFont   :   'build:scssfont',

        buildLess       :   'build:less',
        buildLessFont   :   'build:lessfont',

        buildStylus     :   'build:stylus',
        buildStylusFont :   'build:stylusfont',

        buildScript     :   'build:script',

        buildImg        :   'build:image',
        buildImgIcon    :   'build:imageIcon',

    //CLEAN PROJECT FILES
    cleanGlobal     :   'clean:global',
    cleanScript     :   'clean:script',
    cleanStyle      :   'clean:style',
    cleanHtml       :   'clean:html',
    cleanImage      :   'clean:image',
    cleanProject    :   'clean:project',

    //MAIN BOWER FILES
    bowerJquery     :   'main:jquery',
    bowerJqueryMin  :   './dist/jquery.min.js',
    bowerJqueryPath :   './dist/script',

    //RENAME FILES
    renameScript    :   'script.min.js',
    renameStyle     :   'style.min.css',
    renameStyleFont :   'font.min.css',

    //ERROR
    error           :   'error'
};


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
gulp.task(textExample.cleanImage, function() {
    del.sync(path.cleanImage);
});


/* WATCH FILES FOR RELOAD & SYNC
 =================================*/
gulp.task(textExample.watch, function(){
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
 IMAGE build
==============================*/
gulp.task(textExample.buildImg, function() {
    gulp.src(
        path.src.image
        )
        .pipe(imagemin(
            {
                progressive :   true,
                interlaced  :   true
            }
        ))
        .pipe(pngComp(
            {
                quality     : '65-80',
                speed       : 3
            }
        )())
        .pipe(
            gulp.dest(path.dist.image)
        )
});


/*
 SCRIPT build
 ==============================*/
gulp.task(textExample.buildScript, function () {
    gulp.src(
        path.src.script
        )
        .pipe(jshint())
        .pipe(plumber(
            {
                errorHundler : reportError
            }
        ))
        .pipe(concat('**.js'))
        .pipe(jsmin())
        .pipe(rename(
            textExample.renameScript)
        )
        .pipe(reloadTemplate())
        .pipe(
            gulp.dest(path.dist.script)
        )
        .on(textExample.error, reportError)
});


/*
 STYLE FONT FUNCTION:
 - set task name & path name;
==============================*/
var styleFontTask = function(taskName, pathName) {
    gulp.task(taskName, function() {
        gulp.src(
            pathName
            )
            .pipe(plumber(
                {
                    errorHundler : reportError
                }
            ))
            .pipe(sourcemaps.init())
            .pipe(optionsScssTemplate())
            .pipe(sourcemaps.write())
            .pipe(rename(textExample.renameStyleFont))
            .pipe(reloadTemplate())
            .pipe(
                gulp.dest(path.dist.font)
            )
            .on(textExample.error, reportError)
    });
};
/*
 FUNCTION FONT CALL:
 SCSS:
     - textExample.buildScssFont;
     - path.src.scssFont;
 LESS:
    - textExample.buildLessFont;
    - path.src.lessFont;
 STYLUS:
    - textExample.buildStylusFont;
    - path.src.stylusFont;
 ==============================*/
styleFontTask(textExample.buildScssFont, path.src.scssFont);


/*
 STYLE FUNCTION:
 - set task name & path name;
 ==============================*/
var styleMainTask = function(taskName, pathName) {
    return gulp.task(taskName, function() {
        gulp.src(
            pathName
            )
            .pipe(plumber(
                {
                    errorHundler : reportError
                }
            ))
            .pipe(sourcemaps.init())
            .pipe(optionsScssTemplate())
            .pipe(prefixer(
                {
                    browsers    : ['last 3 versions'],
                    cascade     : true
                }
            ))
            .pipe(sourcemaps.write())
            .pipe(uncss(
                {
                    html        : './dist/index.html'
                }
            ))
            .pipe(cssmin(
                {
                    compatibility    : 'ie9'
                }
            ))
            .pipe(rename(textExample.renameStyle))
            .pipe(reloadTemplate())
            .pipe(
                gulp.dest(path.dist.style)
            )
            .on(textExample.error, reportError)
    });
};
/*
 FUNCTION CALL:
 SCSS:
 - textExample.buildScss;
 - path.src.scss;
 LESS:
 - textExample.buildLess;
 - path.src.less;
 STYLUS:
 - textExample.buildStylus;
 - path.src.stylus;
 ==============================*/
styleMainTask(textExample.buildScss, path.src.scss);


/*
 BUILD HTML TEMPLATE
==============================*/
gulp.task(textExample.buildHtml, function() {
    gulp.src(
        path.src.html
        )
        .pipe(plumber(
            {
                errorHundler: reportError
            }
        ))
        .pipe(rigger())
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(reloadTemplate())
        .pipe(
            gulp.dest(path.dist.html)
        )
        .on(textExample.error, reportError)
});


/*
 BUILD JADE TEMPLATE
==============================*/
gulp.task(textExample.buildJade, function() {
    var YOUR_LOCALS = {};

    gulp.src(
        path.src.jade
        )
        .pipe(plumber(
            {
                errorHundler: reportError
            }
        ))
        .pipe(jade(
            {
                locals      :   YOUR_LOCALS
            }
        ))
        .pipe(prettify(
            {
                indent_size :   4
            }
        ))
        .pipe(reloadTemplate())
        .pipe(
            gulp.dest(path.dist.html)
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
        //textExample.buildJade,
        //textExample.buildScss,
        //textExample.buildFont,
        //textExample.buildScript
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