'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trie = require('node-trie');
var URL = require('url');
var moment = require('moment');
var platformData = require('../data.json');

module.exports = function () {
    function PlatformFinder() {
        _classCallCheck(this, PlatformFinder);

        this.trie = Trie();
        this.categoryMap = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = platformData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var o = _step.value;

                this.categoryMap[o.URL] = o.Platform; // Inits a map to store url - platform
                this.trie.add(o.URL, o.URL); // Inits a trie to store url strings
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    /**
     * Gets the platform of the passed URL
     * @param {*} url URL whose category has to be located
     * @return {Object} category is the platform name and tim_ms 
     * denotes the time taken to find the category in milliseconds
     */


    _createClass(PlatformFinder, [{
        key: 'platform',
        value: function platform(url) {
            var category = null;
            var startTime = moment();
            if (url) {
                if (!url.match(/^(https|http):\/\/{1}/)) url = 'https://' + url; // Append the protocol name if absent
                var parsedURL = URL.parse(url);
                var matchingList = this.trie.get(parsedURL.hostname);
                if (matchingList && matchingList.length > 0) {
                    // Matching list: Subset of the urls starting from hostname
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = matchingList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var categoryUrl = _step2.value;

                            if (url.includes(categoryUrl)) {
                                // Break when category url is part of the input url
                                category = this.categoryMap[categoryUrl];
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }

            return {
                category: category,
                time_ms: moment().diff(startTime)
            };
        }
    }]);

    return PlatformFinder;
}();