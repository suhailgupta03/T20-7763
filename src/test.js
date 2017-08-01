const PlatformFinder = require('./platform-finder');


let platformFinder = new PlatformFinder();
const URL = "https://forums.9carthai.com/path/to/new-dir";

console.log(platformFinder.platform(URL));