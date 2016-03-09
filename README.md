## Gulp-Template

#### Small template using GULP and various development methodologies.

1. Used technologies (HTML-preprocessor, CSS-preprocessor):
    - **JADE** : is a terse language for writing HTML templates;
    - (in preparation...)**~~HAML~~** : is based on one primary principle: markup should be beautiful;
    - (in preparation...)**~~SLIM~~** : is a template language whose goal is reduce the syntax to the essential parts without becoming cryptic;
    - (in preparation...)**~~BEMHTML~~** : the main idea of BEM methodology is to speed development process up and ease the teamwork of developers;
    - (in preparation...)**~~BH~~** : is processor that converts BEMJSON to HTML. Or in other words a template engine;
    - (in preparation...)**~~HANDLEBARS~~** : provides the power necessary to let you build semantic templates effectively with no frustration;
    - **normal HTML** : commonly referred to as HTML, is the standard markup language used to create web pages;

    - **SASS/SCSS** : is a scripting language that is interpreted into Cascading Style Sheets (CSS). SassScript is the scripting language itself;
    - **LESS** : is a dynamic style sheet language that can be compiled into Cascading Style Sheets (CSS) and run on the client-side or server-side;
    - **STYLUS** : EXPRESSIVE, DYNAMIC, ROBUST CSS;
    - **REWORK** : CSS manipulations built on css, allowing you to automate vendor prefixing, create your own properties, inline images, anything you can imagine;

    - (in preparation...)**~~JS-preprocessor~~**...

2. Additional features :
    - **image compress**;
    - **svg/png sprite**;
    - **html-hint**;
    - **js-hint**;
    - **minify & rename files**;
    - **convert SASS to SCSS & <=>**;
    - **SASS/SCSS, JS documentation**;


#### Ok. let's go

First you need to choose the technology that will be used to build the project (in terminal):

    ./start-project.sh

If cmd => {./start-project.sh} an error message:

    sudo chmod +x #{bash fileName} => 'eg : start-project.sh'

Questions for the choice of technology (...after selecting the technology, and the rest removed from the project...):

    Select HTML-preprocessor => [HAML, JADE, SLIM, BEMHTML, BH, HTML, HANDLEBARS] > jade
        Use JADE-/preprocessor in project!
    Select CSS-preprocessor  => [SASS, LESS, STYLUS, REWORK] > sass
        Use SASS-/preprocessor in project!
        Thank you for choosing to continue!