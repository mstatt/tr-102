# Task Runners 102:

As a continuation from the 1st task runner tutorial, in this session we are going to be installing and using gulp.js again but we want to add to our html page optimization with javascript uglification and javascript obfuscation.

# TR-102 dev directory structure as follows:
Project Folder(TR-102)

tr-102/

   |- dev/

       |- index.html
   
       |- js/
   
           |- main.js
      
           |- jquery-3.3.1.min.js
      
gulpfile.js

README.md

package.json

package-lock.json


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


# Run
************************************************

--Open the dev-main.js file in the dev directory. (It is as you coded it)

--Open the package.json file in the dev directory.
--Notice the version #


**********************Run the following command in the terminal***************
>>gulp stagetest


--Open the main.js file in the dev/obf directory. (It is uglified)

--Open the main.js file in the test directory. (It is obfuscated)

--Now open the package.json file in the project directory with a text editor.
--Notice that version # has been incremented.

**********************Run the following command in the terminal***************
>>gulp stageprod

--Now all of the files from the test directory are in the production folder ready for deployment.
--Notice that test directory has been deleted and the so has the dev/obf directory.

************************************************
####Extra npm commands:
-Remove unused packages from the directory to keep things lean.

>>npm prune

************************************************
Part I: (Live Reload)

https://github.com/mstatt/tr-101

Part III: (Live reload)

https://github.com/mstatt/tr-103

************************************************
Helpful Link:
https://gist.github.com/renarsvilnis/ab8581049a3efe4d03d8
