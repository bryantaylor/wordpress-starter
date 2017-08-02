import babelify from 'babelify'
import sync from 'browser-sync'
import browserify from 'browserify'
import watchify from 'watchify'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import assign from 'lodash.assign'
import yaml from 'yamljs'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

var config       = yaml.load('src/config.yml')['compile-sass'];
var handleErrors = require('../util/handleErrors');

const browserifyArgs = {
  entries: 'src/bo/application.js',
  debug: true,
  transform: [ 'babelify' ]
}
const watchifyArgs = assign(watchify.args, browserifyArgs)
const bundler = watchify(browserify(watchifyArgs))
const build = () => {
  console.log('Bundling started...')
  console.time('Bundling finished')
  return bundler
    .bundle()
    .on('error', handleErrors)
    .on('end', () => console.timeEnd('Bundling finished'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('.build/assets/js/maps', { addComment: false }))
    .pipe(gulp.dest('build/assets/js/'))
    .pipe(sync.reload({stream:true}))
}
bundler.on('update', build)
gulp.task('bojs', build)