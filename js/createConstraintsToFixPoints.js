'use strict';

/* global Matter */

bottle.factory("createConstraintsToFixPoints", function (container) {

    function createConstraint(world, element, indexFunc, width, height) {
        var constraint;
        const i = indexFunc(element);
        const index = indexFunc(element);
        if(index > -1) {
            const point = fixPoint(index, width, height);
            console.log(index + ": " + point.x + " / " + point.y);
            constraint = Matter.Constraint.create({bodyA: element.body, pointB: point, length:10, stiffness: 0.00001});
            Matter.World.add(world, [constraint]);
        }
    }

    function extractData(svg, selector) {
        const data = [];
        svg.selectAll(selector)
            .each(function (d) {
                data.push(d);
            });

        return data;
    }

    function fixPoint(i, width, height) {
        const ix = i % 10;
        const iy = Math.floor(i / 10);

        return {
            x: width / 11 * (ix + 1),
            y: height / 6 + (iy + 1)
        }
    }

    function createConstraintsToFixPoints(world, svg, selector, indexFunc, width, height) {
        const data = extractData(svg, selector);
        data.forEach(function (element) {
            createConstraint(world, element, indexFunc, width, height);
        });
    }

    return createConstraintsToFixPoints;
});