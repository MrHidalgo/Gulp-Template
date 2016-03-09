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
        imageIcon   :   './src/image/_icon/**.png',
        // SASS DOCUMENTATION
        sassdoc     :   './src/style/**/**/*.scss'
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
        script      :   './src/script/**.js'
    },

    // CLEAN FOLDER
    clean       :   './dist/*',
    cleanScript :   './dist/script/*',
    cleanStyle  :   './dist/style/*',
    cleanHtml   :   './dist/*.html',
    cleanImage  :   './dist/image/*'
};

module.exports = path;
