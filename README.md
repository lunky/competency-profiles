# competency-profiles # 
[![Build Status](https://travis-ci.org/lunky/competency-profiles.svg?branch=master)](https://travis-ci.org/lunky/competency-profiles)
[![Code Climate](https://codeclimate.com/github/lunky/competency-profiles/badges/gpa.svg)](https://codeclimate.com/github/lunky/competency-profiles)
## Pre-requisites ##
 1. [Git](http://git-scm.com/downloads)
 2. [NodeJS](http://nodejs.org/download/)
 3. [npm](https://www.npmjs.com/) (comes with NodeJS)
 4. [mongoDB](http://www.mongodb.org/)
 
 ## Optional ##
 5. [Node.js Tools for Visual Studio](https://nodejstools.codeplex.com/) (need for opening .njsproj files)

## Getting started ##

 1. `git clone https://github.com/lunky/competency-profiles.git`
 2. `cd competency-profiles/competency-profile`
 3. `npm install` (Note: you may need to use `npm install --msvs_version=2013` 
    if you get an error about MSBuild Tools not being found)
 4. `npm start`
 5. view @ http://localhost:3000/

## Seeding your database ##

The first time you run the application you will need to seed your mongoDB database. 

 1. Startup the mongoDB.exe executable (Windows) or run `mongod` (OSX and *nix). You may need to use the argument `--dbpath <path>` to tell mongoDB where you want your data stored.
 2. Run `npm install -g node-mongo-seeds`.
 3. Run `seed` from inside the competency-profile folder.

## Running Tests with Karma ##

Currently we are setup to use the [Karma](http://karma-runner.github.io/) test runner with the 
[Jasmine](http://jasmine.github.io/) test framework. Karma is a neat test runner that will watch
your test files for changes and run them as you change them. Jasmine is the test framework it uses
to run them. We may change over to the Mocha test framework in the future.

To run launch the configured test script (karma) using npm:

        npm test


To run Karma run this command from competency-profiles/competency-profile:

        karma start

This will run the tests and then wait for any changes to the test files, updating the results as it goes.

 
 
.
