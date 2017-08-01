"use strict";

var PlatformFinder = require('./platform-finder');

var platformFinder = new PlatformFinder();
var URL = "https://forums.9carthai.com/path/to/new-dir";

console.log(platformFinder.platform(URL));