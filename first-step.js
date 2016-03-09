var gulp            =   require('gulp'),
    readline        =   require('readline'),                        // USE PROMPT IN NODE.JS
    del             =   require('del');                             // CLEAN [FOLDER, FILES]

var configuration   =   require('./gulp-files/gulp-config.js');     // CONFIGURATION FILES..

/*
 CHOOSE MAIN TECHNOLOGY FUNCTION:
 ==============================*/
const rl = readline.createInterface(
    {
        input   : process.stdin,
        output  : process.stdout
    }
);

function mainQuestion(count) {
    var objQues = {
        0   : '\nSelect HTML-preprocessor => [HAML, JADE, SLIM, BEMHTML, BH, HTML, HANDLEBARS] > ',
        1   : 'Select CSS-preprocessor  => [SASS, LESS, STYLUS, REWORK] > '
    };

    while (count <= 1){
        rl.setPrompt(objQues[count].toUpperCase());

        if(count === 2){
            rl.close()
        } else {
            count++;
            return rl.prompt();
        }
    }
}

function deleteFolder(line) {
    var obj = {
        htmlObj : [
            'test/html/**',
            '!test/html',
            '!test/html/'+line+''
        ],
        styleObj : [
            'test/style/**',
            '!test/style',
            '!test/style/'+line+''
        ]
    };

    gulp.task('clean', function() {
        for( var i = 0; i < configuration.mainConfig.prompt.html.length; i++) {
            if (line === configuration.mainConfig.prompt.html[i]) {
                del.sync(
                    obj.htmlObj
                );
            }
        };

        for( var i = 0; i < configuration.mainConfig.prompt.style.length; i++) {
            if (line === configuration.mainConfig.prompt.style[i]) {
                del.sync(
                    obj.styleObj
                );
            }
        }
    });

    return gulp.start('clean');
}


var steps = 0;
mainQuestion(steps);

rl.on('line', function(line) {
    var line        = line.toLowerCase(),
        strThs      = '\nThank you for choosing to continue\n',
        strResult   = '\n\tUse '+ line.toUpperCase() +'-/preprocessor in project!\n';

    for(var i = 0; i <= configuration.mainConfig.prompt.html.length; i++) {
        if(line === configuration.mainConfig.prompt.html[i]) {
            console.log(strResult);
            deleteFolder(line);
            steps++;
        }
    }

    for(var i = 0; i <= configuration.mainConfig.prompt.style.length; i++) {
        if(line === configuration.mainConfig.prompt.style[i]) {
            console.log(strResult);
            deleteFolder(line);
            steps++;
        }
    }

    if (line === 'quit' || line === 'q' || line === 'exit' || line === 'e' || steps === 2){
        console.log(strThs.toUpperCase());
        rl.close();
    }

    mainQuestion(steps);
    rl.prompt();

}).on('close', function() {
    process.exit(0);
});


