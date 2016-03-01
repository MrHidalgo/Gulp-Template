var gulp        =   require('gulp'),
    path        =   require('./gulp-path.js'),      // OBJECT PATH & COMMANDS
    commands    =   require('./gulp-command.js'),
    template    =   require('./gulp-template.js'),
    _if             =   require('gulp-if'),
    plumber         =   require('gulp-plumber'),
    sourcemaps      =   require('gulp-sourcemaps');


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
 - set task name & path name;
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
 - set task name & path name, opt variable;
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

module.exports.htmlMainTask     = htmlMainTask;
module.exports.styleMainTask    = styleMainTask;
