'use strict';

/* global document */

bottle.factory("svgUtil", function (container) {

    function getSvgBoundingRectOfElement(selector) {
        var element = document.querySelector(selector);
        if (element != null) {
            return element.getBoundingClientRect();
        }
        else {
            return {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            };
        }

        return boundingRect;
    }

    function adaptPositionToElement(x, y, selector) {
        var svgBoundingRect = getSvgBoundingRectOfElement(selector);
        var xAdapted = x + svgBoundingRect.left;
        var yAdapted = y + svgBoundingRect.top;

        return {
            x: xAdapted,
            y: yAdapted
        }
    }

    function adaptPositionToSvg(x, y, svgSelector) {
        return adaptPositionToElement(x, y, svgSelector)
    }

    return {
        adaptPositionToSvg: adaptPositionToSvg
    }
});