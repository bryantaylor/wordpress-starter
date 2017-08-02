'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _babelify = require('babelify');
var _babelify2 = _interopRequireDefault(_babelify);
var _browserSync = require('browser-sync');
var _browserSync2 = _interopRequireDefault(_browserSync);
var _browserify = require('browserify');
var _browserify2 = _interopRequireDefault(_browserify);
var _watchify = require('watchify');
var _watchify2 = _interopRequireDefault(_watchify);
var _gulp = require('gulp');
var _gulp2 = _interopRequireDefault(_gulp);
var _gulpSourcemaps = require('gulp-sourcemaps');
var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);
var _lodashAssign = require('lodash.assign');
var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
var _yamljs = require('yamljs');
var _yamljs2 = _interopRequireDefault(_yamljs);
var _vinylSourceStream = require('vinyl-source-stream');
var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);
var _vinylBuffer = require('vinyl-buffer');
var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);
var config = _yamljs2['default'].load('src/config.yml')['compile-sass'];
var handleErrors = require('../util/handleErrors');

var browserifyArgs = {
  entries: 'src/bo/application.js',
  debug: true,
  transform: ['babelify']
};
var watchifyArgs = (0, _lodashAssign2['default'])(_watchify2['default'].args, browserifyArgs);
var bundler = (0, _watchify2['default'])((0, _browserify2['default'])(watchifyArgs));
var build = function build() {
  console.log('Bundling started...');
  console.time('Bundling finished');
  return bundler.bundle().on('error', handleErrors).on('end', function () {
    return console.timeEnd('Bundling finished');
  }).pipe((0, _vinylSourceStream2['default'])('bundle.js')).pipe((0, _vinylBuffer2['default'])()).pipe(_gulpSourcemaps2['default'].init({ loadMaps: true }))
  //.pipe(uglify())
  .pipe(_gulpSourcemaps2['default'].write('.build/assets/js/maps', { addComment: false })).pipe(_gulp2['default'].dest('build/assets/js/')).pipe(_browserSync2['default'].reload({ stream: true }));
};
bundler.on('update', build);
_gulp2['default'].task('bojs', build);