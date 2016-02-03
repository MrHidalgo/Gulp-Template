'use strict'

/* NPM PACKAGES
=================================*/
var gulp            =   require('gulp'),
    mainBowerFiles  =   require('main-bower-files'),    // MAIN BOWER FILES
    watch           =   require('gulp-watch'),          // WATCH FILE
    browserSync     =   require('browser-sync'),        // LIVERELOAD & SERVER PROJECT
    rimraf          =   require('rimraf'),              // CLEAN PATH
    util            =   require('gulp-util'),           // FOR WATCH ERROR
    plumber         =   require('gulp-plumber'),        // FOR WATCH ERROR
    notify          =   require("gulp-notify"),         // NOTIFY
    reload          =   browserSync.reload;             // RELOAD


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
}


/* PATH FOR FILES
=================================*/
var path = {
    // Finish files project
    dist: {
        //
    },

    // Work with files
    src: {
        //
    },

    // Watch all time
    watch:{
        //
    },

    // clean path
    clean: './dist/*'
};


/* SERVER CONFIG
=================================*/
var config = {
    server: {
        baseDir : './dist'
    },
    tunnel      : true,
    host        : 'localhost',
    port        : 9000,
    logPrefix   : 'FrontEnd Server'
};


/* WEB-SERVER
=================================*/
gulp.task('server', function() {
    browserSync(config);
});


/* CLEAN PROJECT
=================================*/
gulp.task('clean', function(e) {
    rimraf(path.clean, e);
});


/* WATCH FILES FOR RELOAD & SYNC
=================================*/
gulp.task('watch', function(){
    //watch([path.watch.jade], function() {
    //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    //    gulp.start();
    //});
    //watch([path.watch.html], function() {
    //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    //    gulp.start();
    //});
    //watch([path.watch.scss], function() {
    //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    //    gulp.start();
    //});
});


/* MAIN FILES
 =================================*/
gulp.task('bowerMain', function() {
    var main = gulp.src(mainBowerFiles(
        {
            overrides: {
                jquery : {
                    main : [
                        './dist/jquery.min.js'
                    ]
                }
            }
        }
        ))
        .pipe(gulp.dest('./dist/script'));

    return main;
});


/*
 TASK FOR MAIN FILES
 ==============================*/
gulp.task('mainFiles',
    [
        //JQUERY
        'bowerMain'
    ]
);


/*
  SCSS FILES build
==============================*/
//gulp.task('build:mainSCSS', function() {
//    gulp.src(path.src.scss)
//        .pipe(plumber(
//            {
//                errorHundler         : reportError
//            }
//        ))
//        .pipe(sourcemaps.init())
//        .pipe(sass(
//            {
//                sourceMap        : true,
//                errLogToConsole  : true,
//                outputStyle      : 'compressed'
//            }
//        ))
//        .pipe(sourcemaps.write())
//        .pipe(prefixer(
//            {
//                browsers         : ['last 3 versions'],
//                cascade          : true
//            }
//        ))
//        .pipe(cssmin(
//            {
//                compatibility    : 'ie9'
//            }
//        ))
//        .pipe(gulp.dest(path.dist.scss))
//        .pipe(reload(
//            {
//                stream: true
//            }
//        ))
//        .pipe(notify(
//            {
//                message          : "MAIN SASS FILE CREATE : <%= file.relative %> @ <%= options.date %>",
//                templateOptions  : {
//                    date: new Date()
//                }
//            }
//        ))
//        .on('error', reportError)
//});


/*
 MAIN BUILD "ALL TASK"
==============================*/
//gulp.task('build',
//    [
//        'build:jade',
//        'build:mainHTML',
//        'build:mainSCSS'
//    ]
//);


/* MAIN TASK FOR PROJECT
=================================*/
gulp.task('main',
    [
        'build',
        'server',
        'watch'
    ]
);