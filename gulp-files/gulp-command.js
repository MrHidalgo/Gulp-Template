/* TEXT EXAMPLE
 =================================*/
var commands = {
    //SERVER
    server          :   'server',
    tunnel          :   'tunnel',

    //WATCH FILE
    watch           :   'watch',

    //BUILD PROJECT FILES
    build           :   'build',
    buildMain       :   'main',

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
    error           :   'error',

    // SASS DOCUMENTATION
    sassdoc         :   'doc'
};

module.exports = commands;