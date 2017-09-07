'use strict';

/* global bottle */
/* global Matter */

bottle.factory("createConstraintsToFixPoints", function (container) {

    function createConstraintsToFixPoints(world, data, categoryFunc, width, height, stiffness, damping) {
        data.forEach(function (element) {
            createConstraint(world, element, categoryFunc, width, height, stiffness, damping);
        });
    }

    function createConstraint(world, element, categoryFunc, width, height, stiffness, damping) {
        stiffness = stiffness ? stiffness : 0.0005;
        damping = damping ? damping : 0.1;

        const category = categoryFunc(element);

        if(category > -1) {
            const point = fixPoint(category, width, height);
            const constraint = Matter.Constraint.create({bodyA: element.body, pointB: point, length:10, stiffness: stiffness, damping: damping});
            Matter.World.add(world, [constraint]);
        }
    }

    function fixPoint(category, width, height) {
        const DENOMINATOR = 5;
        const leftWidth = width/DENOMINATOR;
        const rightWidth = (DENOMINATOR-1)*width/DENOMINATOR;
        const topHeight = height/DENOMINATOR;
        const bottomHeight = (DENOMINATOR-1)*height/DENOMINATOR;
        const middleWidth = width/2;
        const middleHeight = height/2;
        switch(category) {
            case 0:
                return {x: leftWidth, y: topHeight};

            case 1:
                return {x: rightWidth, y: bottomHeight};

            case 2:
                return {x: rightWidth, y: topHeight};

            case 3:
                return {x: leftWidth, y: bottomHeight};

            default:
                return {x: middleWidth, y: middleHeight};

        }
    }

    return createConstraintsToFixPoints;
});