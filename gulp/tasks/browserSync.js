// BrowserSync for static build server and live reload
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml             = require('yamljs');
var global_config    = yaml.load('src/config.yml');
var config           = global_config.browserSync;
    config.name      = global_config.projectName;
// =======   
// Dependencies
// =======  
var gulp       = require('gulp');
var browserSync  = require('browser-sync');
// =======   
// Tasks:
// ======= 
gulp.task('browserSync', function() {
  if(config) {	
	  browserSync.init(null, config);
  } else {
  	console.log('browserSync disabled via config.yml');
  }
});