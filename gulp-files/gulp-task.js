var gulp            =   require('gulp'),
    sassdoc         =   require('sassdoc'),             // SASS DOCUMENTATION
    path            =   require('./gulp-path.js'),      // OBJECT PATH & COMMANDS
    commands        =   require('./gulp-command.js'),
    configuration   =   require('./gulp-config.js'),    // CONFIGURATION FILE
    template        =   require('./gulp-template.js'),
    _if             =   require('gulp-if'),             // IF - ELSE
    plumber         =   require('gulp-plumber'),        // ERROR
    sourcemaps      =   require('gulp-sourcemaps'),     // SCSS
    imagemin        =   require('gulp-imagemin'),       // IMAGE
    pngComp         =   require('imagemin-pngquant'),
    concat          =   require('gulp-concat'),         // JS FILES
    jshint          =   require('gulp-jshint'),
    jsmin           =   require('gulp-uglifyjs'),
    rename          =   require('gulp-rename'),         // RENAME OUT.. FILES
    notify          =   require("gulp-notify"),         // NOTIFY
    util            =   require('gulp-util');


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
 HTML FUNCTION:
     opt:
        - 'html' || 'jade';
 ==============================*/
function htmlMainTask(opt, taskName, pathName) {
    return gulp.task(taskName, function() {
        var ifHtml = opt === 'html',
            ifJade = opt === 'jade';

        gulp.src(
            pathName
            )
            .pipe(plumber(
                configuration.mainConfig.errorPlumber
            ))
            .pipe(_if(ifHtml, template.htmlOptions()))
            .pipe(_if(ifJade, template.jadeOptions()))
            .pipe(template.reloadTemplate())
            .pipe(
                gulp.dest(path.dist.html)
            )
            .on(commands.error, reportError)
    });
};

/*
 STYLE FUNCTION:
     opt:
        - 'style' || 'font';
 ==============================*/
function styleMainTask(opt, taskName, pathName) {
    gulp.task(taskName, function() {
        var ifFont   = opt === 'font',
            ifStyle  = opt === 'style';

        gulp.src(
            pathName
            )
            .pipe(plumber(
                configuration.mainConfig.errorPlumber
            ))
            .pipe(sourcemaps.init())
            .pipe(template.optionsScssTemplate())
            .pipe(_if(ifFont, template.styleFontOptions()))
            .pipe(_if(ifStyle, template.styleFileOptions()))
            .pipe(sourcemaps.write('./maps'))
            .pipe(
                gulp.dest(path.dist.style)
            )
            .on(commands.error, reportError)
    });
};

/*
 IMAGE FUNCTION:
 ==============================*/
function mainImageTask(taskName, pathName) {
    return gulp.task(taskName, function() {
        gulp.src(
            pathName
            )
            .pipe(imagemin(
                configuration.mainConfig.image.minify
            ))
            .pipe(pngComp(
                configuration.mainConfig.image.compress
            )())
            .pipe(
                gulp.dest(path.dist.image)
            )
    });
}

/*
 SCRIPT FUNCTION:
 ==============================*/
function mainScriptTask(taskName, pathName) {
    return gulp.task(taskName, function () {
        gulp.src(
            pathName
            )
            .pipe(jshint())
            .pipe(plumber(
                configuration.mainConfig.errorPlumber
            ))
            .pipe(concat('**.js'))
            .pipe(jsmin())
            .pipe(rename(
                commands.renameScript)
            )
            .pipe(template.reloadTemplate())
            .pipe(
                gulp.dest(path.dist.script)
            )
            .on(commands.error, reportError)
    });
}

/*
 SASS DOCUMENTATION FUNCTION:
 ==============================*/
function sassDocumenation(taskName, pathName) {
    return gulp.task(taskName, function() {
        gulp.src(
            pathName
            )
            .pipe(sassdoc(
                configuration.mainConfig.sassdoc
            ));
    });
}


module.exports.reportError          =   reportError;
module.exports.htmlMainTask         =   htmlMainTask;
module.exports.styleMainTask        =   styleMainTask;
module.exports.mainImageTask        =   mainImageTask;
module.exports.mainScriptTask       =   mainScriptTask;
module.exports.sassDocumenation     =   sassDocumenation;

