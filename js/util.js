'use strict';

/* global bottle */
/* global _ */
/* global $ */
/* global window */

bottle.factory("util", function (container) {
    var util = {};

    /**
     * from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     */
    util.param = function (name, defaultVal) {
        var uri = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(uri);
        if (!results) return defaultVal;
        if (!results[2]) return defaultVal;
        return _.isEmpty(results[2]) ? defaultVal : decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    
    util.adddHash = function (uri) {
        if(uri.indexOf('#') < 0) {
            return uri + '#';
        }
        return uri;
    };

    util.getHashParam = function(paramName, defaultValue) {
        var hash = $.url('#');
        if(_.isEmpty(hash)) {
            return defaultValue;
        }
        var value = $.url('#')[paramName];
        if(_.isEmpty(value)) {
            return defaultValue;
        }
        return value;
    };

    util.changeHashParam = function(paramName, newValue) {
        var currentValue = this.getHashParam(paramName);
        var newUrl;
        if(_.isEmpty(currentValue)) {
            var _url = this.adddHash($.url());
            if(!_url.endsWith("&")) {
                _url = _url + "&";
            }
            newUrl = _url + paramName + "=" + newValue;
        }
        else {
            newUrl = $.url().replace(paramName+"="+currentValue, paramName+"="+newValue);
        }

        this.setHref(newUrl);
    };

    util.removeHashParam = function (paramName) {
        var currentValue = this.getHashParam(paramName);
        if(!_.isEmpty(currentValue)) {
            var url = $.url();
            var woAmpersand = paramName + "=" + currentValue;
            var wAmpersand = "&" + woAmpersand;
            var newUrl;
            if(url.indexOf(wAmpersand) > -1) {
                newUrl = url.replace(wAmpersand, "");
            }
            else {
                newUrl = url.replace(woAmpersand, "");
            }
            this.setHref(newUrl);
        }
    };

    util.setHref = function(newUrl) {
        window.location.href = newUrl;
    };

    util.getLongestString = function (arrayOfStrings) {
        var max = 0;
        arrayOfStrings.forEach(function (string) {
            if (!_.isEmpty(string) && string.length > max) {
                max = string.length;
            }
        });

        return max;
    };

    util.copyAttributes = function (attributes, src, dest) {
        attributes.forEach(function (name) {
            dest[name] = src[name];
        });
    };

    util.uid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4();
    };

    util.pushIfNotAlreadyThere = function(array, element) {
        if(array.indexOf(element) < 0) {
            array.push(element);
        }
    };



    util.compare = function(a, b) {
        if(a < b) {
            return -1
        }
        else if(a > b) {
            return 1;
        }
        return 0;
    };

    return util;
});
