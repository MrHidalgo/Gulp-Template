var commands    =   require('./gulp-command.js'),
    path        =   require('./gulp-path.js'),
    task        =   require('./gulp-task.js'),       // TASK.. [main task for gulp..]
    YOUR_LOCALS =   {};


/*
 MAIN CONFIG FILES
 ==============================*/
var mainConfig                 = {
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
            path.watch.jade,
            path.watch.jadeWatch,
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
    },

    // sass documentation==========
    sassdoc                     : {
        dest    : 'docs/sass',
        verbose : true,
        display : {
            access      : ['public', 'private'],
            alias       : true,
            watermark   : true
        },
        groups  : {
            function    : 'Function Group',
            variable    : 'Variable Group',
            mixin       : 'Mixin Group'
        }
    },

    // choose user=================
    prompt                      : {
        html : [
            'jade',
            'haml',
            'slim',
            'bemhtml',
            'bh',
            'html',
            'handlebars'
        ],
        style : [
            'sass',
            'less',
            'stylus',
            'rework'
        ]
    }
};

/*
 MODULE EXPORTS...
 ==============================*/
module.exports.mainConfig   =   mainConfig;