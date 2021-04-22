'use strict';
const build = require('@microsoft/sp-build-web');
const eslint = require('gulp-eslint');
const typeScriptConfig = require('@microsoft/gulp-core-build-typescript/lib/TypeScriptConfiguration');
const buildtypescript = require('@microsoft/gulp-core-build-typescript');

typeScriptConfig.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));
buildtypescript.tslint.enabled = false;

const eslintSubTask = build.subTask('eslint', function (gulp, buildOptions, done) {
  return (
    gulp
      .src(['src/**/*.{ts,tsx}'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.rig.addPreBuildTask(build.task('eslint-task', eslintSubTask));

build.initialize(require('gulp'));
