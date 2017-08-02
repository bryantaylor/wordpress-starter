<?php
/*
Among its other special powers, Timber implements modern routing in the Express.js/Ruby on Rails mold, making it easy
for you to implement custom pagination--and anything else you might imagine in your wildest dreams of URLs and
parameters. OMG so easy!

Routes::map('$pattern', function($params) {
  $query = new WP_Query($args);
  $params = array('thing' => 'foo', 'bar' => 'I dont even know');
  Routes::load('template.php', $params, $query, 200);
});

https://github.com/Upstatement/routes
*/
