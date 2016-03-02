var commands    =   require('./gulp-command.js'),
    path        =   require('./gulp-path.js'),
    task        =   require('./gulp-task.js'),       // TASK.. [main task for gulp..]
    YOUR_LOCALS =   {};


/*
 MAIN CONFIG FILES
 ==============================*/
var _mainConfig                 = {
    // config server===============
    config                      : {
        server : {
            baseDir : './dist'
        },
        tunnel      : 'lucky',
        online      : true,
        notify      : true,
        host        : 'localhost',
        port        : 1234,
        logPrefix   : 'FrontEnd Server'
    },

    // plumber
    errorPlumber                : {
        errorHundler: task.reportError
    },

    // bower=======================
    bower                       : {
        overrides : {
            jquery : {
                main : [
                    commands.bowerJqueryMin
                ]
            }
        }
    },

    // style=======================
    scss                        : {
        // sourcemaps
        sourceMaps : {
            sourceMap       : true,
            errLogToConsole : true,
            outputStyle     : 'compressed'
        },

        // scss
        stylize : {
            pref : {
                browsers     : ['last 3 versions'],
                cascade      : true
            },
            unstyle : {
                html         : './dist/index.html'
            },
            minify : {
                compatibility: 'ie9'
            }
        }
    },

    // jade========================
    jade                        : {
        locals : YOUR_LOCALS,
        pretty : true
    },

    // image=======================
    image                       : {
        minify : {
            progressive :   true,
            interlaced  :   true
        },
        compress : {
            quality     : '65-80',
            speed       : 3
        }
    },

    // watch=======================
    watchParameters             : {
        arr : [
            path.watch.html,
            path.watch.htmlWatch,
            path.watch.scss,
            path.watch.scssWatch,
            path.watch.script
        ]
    },

    // build=======================
    build                       : {
        arr : [
            commands.buildJade,
            commands.buildScss,
            commands.buildScript
        ]
    },

    // main task===================
    main                        : {
        arr : [
            commands.build,
            commands.server,
            commands.watch
        ]
    }
};

/*
 MODULE EXPORTS...
 ==============================*/
module.exports._mainConfig   =   _mainConfig;