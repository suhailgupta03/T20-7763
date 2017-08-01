const Trie = require('node-trie');
const URL = require('url');
const moment = require('moment');
const platformData = require('../data.json');

module.exports = class PlatformFinder {

    constructor() {
        this.trie = Trie();
        this.categoryMap = {};

        for (let o of platformData) {
            this.categoryMap[o.URL] = o.Platform; // Inits a map to store url - platform
            this.trie.add(o.URL, o.URL); // Inits a trie to store url strings
        }
    }

    /**
     * Gets the platform of the passed URL
     * @param {*} url URL whose category has to be located
     * @return {Object} category is the platform name and tim_ms 
     * denotes the time taken to find the category in milliseconds
     */
    platform(url) {
        let category = null;
        let startTime = moment();
        if (url) {
            if (!url.match(/^(https|http):\/\/{1}/))
                url = `https://${url}` // Append the protocol name if absent
            let parsedURL = URL.parse(url);
            let matchingList = this.trie.get(parsedURL.hostname);
            if (matchingList.length > 0) {
                // Matching list: Subset of the urls starting from hostname
                for (let categoryUrl of matchingList) {
                    if (url.includes(categoryUrl)) {
                        // Break when category url is part of the input url
                        category = this.categoryMap[categoryUrl];
                        break;
                    }
                }
            }
        }

        return {
            category: category,
            time_ms: moment().diff(startTime)
        };
    }
}