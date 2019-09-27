define([], function() {
  'use strict';

  var t = Date.now();
  while (Date.now() - t < 1000 * 10) {}
  console.log('longtime.js');
});
