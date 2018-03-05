//Plugins and requires
var gulp = require('gulp');
var bump = require('gulp-bump');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
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
  console.log('Starting scriptswork task');
   return gulp.src(DEV_PATH + 'js/main.js')
         .pipe(uglify())
         .pipe(concat('main.js')) // This is if you are combining multiple js files into one.
         .pipe(gulp.dest(DEV_PATH + '/js/obf'))
});


//Pre-obfuscation remove current js file to avoid conflict
gulp.task('pre-obfuscation', function () {
    return gulp.src([TEST_PATH + '/js/main.js',TEST_PATH + '/js/obf'], {read: false})
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
      js: DEV_PATH + '/js/obf/main.js',
    }
};
  return gulp.src(path.src.js)
      .pipe(js_obfuscator({}, ["**/jquery-*.js"]))
      .pipe(gulp.dest(path.build.js));
});


////Build the prod directory structure and files from test
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
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(TEST_PATH));
});


//Update the version in package.json
gulp.task("bump", function () {
  console.log('Updating the buid version.');
    return gulp.src("./package.json")
        .pipe(bump({ type: "minor" }))
        .pipe(gulp.dest("./"));
});


//Pre-obfuscation remove current js file to avoid conflict
gulp.task('postflight', function () {
    return gulp.src([TEST_PATH,DEV_PATH + '/js/obf'], {read: false})
        .pipe(clean());
});

//In sequence build the test directory, clean up index.html, obfuscate the javascript and update version # in the package.json and stage all of the files
//publishtest
gulp.task('stagetest',function (){
console.log('Starting to Publish test files..............');
runSequence('cleantest','scriptswork','buildtest','indexcleanup','pre-obfuscation','obfuscate','bump');
console.log('Completed publishing test files..............');
});

//Stage files from test to prod and delete test dir
gulp.task('stageprod',function (){
console.log('Starting to Publish production files..............');
runSequence('cleanprod','buildprod','postflight');
console.log('Completed publishing production files..............');
});
