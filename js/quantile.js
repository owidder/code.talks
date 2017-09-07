'use strict';

/* global bottle */
/* global d3 */

bottle.factory("quantile", function (container) {

    function quantile(data, accessFunc) {
        const quantile = d3.scaleQuantile()
            .domain(data.map(function (element) {
                return accessFunc(element);
            }))
            .range(d3.range(5));

        return quantile;
    }

    return quantile;
});
