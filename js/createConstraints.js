'use strict';

/* global Matter */

bottle.factory("createConstraints", function (container) {

    function createConstraint(world, sourceElement, targetElement, testFunc) {
        var constraint;
        if(!testFunc(sourceElement, targetElement)) {
            constraint = Matter.Constraint.create({bodyA: sourceElement.body, bodyB: targetElement.body, length: 500, stiffness: 0.00001});
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

    function createConstraints(world, svg, selector, testFunc) {
        const data = extractData(svg, selector);
        for(var i = 0; i < data.length-1; i++) {
            const sourceElement = data[i];
            for(var j = i+1; j < data.length; j++) {
                const targetElement = data[j];
                createConstraint(world, sourceElement, targetElement, testFunc);
            }
        }
    }

    return createConstraints;
});