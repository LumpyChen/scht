
require('./libs/plugins/animate.css');
require('./css/main.css');
require('./images/favicon.png');

var backgroundChange = require('./libs/main.js');
var modernizr = require('./libs/plugins/modernizr.js')
var bgStretch = require('./libs/plugins/jquery.backstretch.min.js')

modernizr();
backgroundChange(jQuery);
bgStretch(jQuery,window);
