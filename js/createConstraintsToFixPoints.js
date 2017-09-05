'use strict';

/* global Matter */

bottle.factory("createConstraintsToFixPoints", function (container) {

    function createConstraint(world, element, indexFunc, width, height, stiffness, damping) {
        stiffness = stiffness ? stiffness : 0.0005;
        damping = damping ? damping : 0.1;

        var constraint;
        const i = indexFunc(element);
        const index = indexFunc(element);

        if(index > -1) {
            const point = fixPoint(index, width, height);
            console.log(index + ": " + point.x + " / " + point.y);
            constraint = Matter.Constraint.create({bodyA: element.body, pointB: point, length:10, stiffness: stiffness, damping: damping});
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
        const DENOMINATOR = 5;
        const leftWidth = width/DENOMINATOR;
        const rightWidth = (DENOMINATOR-1)*width/DENOMINATOR;
        const topHeight = height/DENOMINATOR;
        const bottomHeight = (DENOMINATOR-1)*height/DENOMINATOR;
        const middleWidth = width/2;
        const middleHeight = height/2;
        switch(i) {
            case 1:
                return {x: leftWidth, y: topHeight};

            case 2:
                return {x: rightWidth, y: topHeight};

            case 3:
                return {x: rightWidth, y: bottomHeight};

            case 4:
                return {x: leftWidth, y: bottomHeight};

            default:
                return {x: middleWidth, y: middleHeight};

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