var gulp            =   require('gulp'),
    path            =   require('./gulp-path.js'),      // OBJECT PATH & COMMANDS
    commands        =   require('./gulp-command.js'),
    template        =   require('./gulp-template.js'),
    _if             =   require('gulp-if'),             // IF - ELSE
    plumber         =   require('gulp-plumber'),        // ERROR
    sourcemaps      =   require('gulp-sourcemaps'),     // SCSS
    imagemin        =   require('gulp-imagemin'),       // IMAGE
    pngComp         =   require('imagemin-pngquant'),
    concat          =   require('gulp-concat'),         // JS FILES
    jshint          =   require('gulp-jshint'),
    jsmin           =   require('gulp-uglifyjs'),
    rename          =   require('gulp-rename'),
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
            .pipe(plumber({
                errorHundler: reportError
            }))
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
        var ifStyle = opt === 'font',
            ifFont  = opt === 'style';

        gulp.src(
            pathName
            )
            .pipe(plumber({
                errorHundler : reportError
            }))
            .pipe(sourcemaps.init())
            .pipe(template.optionsScssTemplate())
            .pipe(sourcemaps.write())
            .pipe(_if(ifStyle, template.styleFontOptions()))
            .pipe(_if(ifFont, template.styleFileOptions()))
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
            .pipe(plumber({
                errorHundler : reportError
            }))
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


module.exports.htmlMainTask     =   htmlMainTask;
module.exports.styleMainTask    =   styleMainTask;
module.exports.mainImageTask    =   mainImageTask;
module.exports.mainScriptTask   =   mainScriptTask;
