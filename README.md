# Task Runners 102:

As a continuation forom the 1st task runner tutorial, in this session we are going to be installing and using gulp.js again but we want to add to our html page optimization with javascript uglification and javascript obfuscation.

# Set up your directory structure as follows:
Project Folder(TR-101)

-test

-prod

-dev

--index.html

--css

--js

---main.js
---jquery-3.3.1.min.js

--img

--assets

*** ">>" means run this from the command terminal without the ">>" ***

# Some introduction
Install NODE.JS:
-- Install Node:
http://nodejs.org

--Open a command prompt and navigate to your project directory.

--NPM and gulp should alread ybe installed from the previous session but if you started a new project do not worry. The commands with install and load all you need.

--We are adding 2 new plug-ins for this one.

--The gulp-uglify plug-in for minifying JavaScript files.

--The gulp-js-obfuscator is a means of "obscuring" the human readable javascript code.

# Install
Here are all of the commands to run(once Node is installed):

(Open a command prompt and navigate to the project directory)

********************** Command to install npm **********************
>>npm install

********************** Single line command to install all plugins ***************
>>npm install gulp gulp-htmlclean gulp-clean-css gulp-concat gulp-uglify run-sequence gulp-bump del gulp-remove-empty-lines gulp-clean gulp-js-obfuscator --save-dev

Now open your gulpfile.js with a text editor (Ensure that the following is included):
******************** Below this line****************
//Plugins and requires
var gulp = require('gulp');
var bump = require('gulp-bump');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var js_obfuscator = require('gulp-js-obfuscator');
var clearlines = require('gulp-remove-empty-lines');

//Set up Paths
var DEV_PATH = 'dev/';
var TEST_PATH = 'test/';
var PROD_PATH = 'prod/';


//Clean Test Directories

gulp.task('cleantest', function () {
  console.log('Cleaning Up files and directories');
    return gulp.src(TEST_PATH, {read: false})
        .pipe(clean());
});

//Clean Prod Directories

gulp.task('cleanprod', function () {
  console.log('Cleaning Up files and directories');
    return gulp.src(PROD_PATH, {read: false})
        .pipe(clean());
});

//Build the test directory structure and files

gulp.task('buildtest', function() {
  console.log('Building test directory');
  return gulp.src(DEV_PATH + '**/*')
    .pipe( gulp.dest(TEST_PATH))
});

//Uglify and combine all specified js files into one

gulp.task('scriptswork',function (){
  console.log('Starting scripts task');
  //Uglify all js files in the 'public/scripts' directory
   return gulp.src(DEV_PATH + 'js/dev-main.js')
         .pipe(uglify())
         .pipe(concat('main.js'))
         .pipe(gulp.dest(DEV_PATH + '/js'))
});


//Pre-obfuscation remove current js file to avoid conflict

gulp.task('pre-obfuscation', function () {
    return gulp.src([TEST_PATH + '/js/main.js',TEST_PATH + '/js/dev-main.js'], {read: false})
        .pipe(clean());
});

//Javascript Obfuscator

gulp.task('obfuscate',function (){
  console.log('Obfuscating js file.');
  var path = {
    build: {
      js: TEST_PATH + '/js',
    },
    src: {
      js: DEV_PATH + '/js/main.js',
    }
};
  return gulp.src(path.src.js)
      .pipe(js_obfuscator({}, ["**/jquery-*.js"]))
      .pipe(gulp.dest(path.build.js));
});


//Build the prod directory structure and files from test

gulp.task('buildprod', function() {
  console.log('Building production directory');
  return gulp.src(TEST_PATH + '**/*')
    .pipe( gulp.dest(PROD_PATH))
});

//Clean up Html

gulp.task('indexcleanup', function () {
  console.log('Cleaning up index.html.');
  gulp.src(TEST_PATH + 'index.html')
  .pipe(clearlines({
    removeComments: true
  }))
  .pipe(gulp.dest(TEST_PATH));
});


//Update the version in package.json

gulp.task("bump", function () {
  console.log('Updating the buid version.');
    return gulp.src("./package.json")
        .pipe(bump({ type: "minor" }))
        .pipe(gulp.dest("./"));
});

//In sequence build the test directory, clean up index.html and update version # in the package.json

//publishtest

gulp.task('publishtest',function (){
console.log('Starting to Publish test files..............');
runSequence('cleantest','scriptswork','buildtest','indexcleanup','pre-obfuscation','obfuscate','bump');
console.log('Completed publishing test files..............');
});

//Publish files from test to prod

//publishprod

gulp.task('publishprod',function (){
console.log('Starting to Publish production files..............');
runSequence('cleanprod','buildprod');
console.log('Completed publishing production files..............');
});
******************** Above this line****************
--Save the gulp file.

# Run
************************************************

--Open the index.html file in the dev directory.
--Notice the comments and empty lines

--Open the package.json file in the dev directory.
--Notice the version #


**********************Run the following command in the terminal***************
>>gulp publishtest


--Now open the index.html file in the test directory with a text editor.
--Notice that there are no blanklines or comments.

--Now open the package.json file in the project directory with a text editor.
--Notice that version # has been incremented.

**********************Run the following command in the terminal***************
>>gulp publishprod

--Now all of the files from the test directory are in the production folder ready fr deployment.

************************************************
####Extra npm commands:
-Remove unused packages from the directory to keep things lean.

npm prune


************************************************
Helpful Link:
https://gist.github.com/renarsvilnis/ab8581049a3efe4d03d8
