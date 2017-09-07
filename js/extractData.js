'use strict';

/* global bottle */

bottle.factory("extractData", function (container) {
    function extractData(root, selector) {
        const data = [];
        root.selectAll(selector)
            .each(function (d) {
                data.push(d);
            });

        return data;
    }

    return extractData;
});
