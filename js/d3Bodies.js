'use strict';

/* global Matter */

function createBodiesFromRects(className) {
    function hasClass(element, className) {
        return element.classList.contains(className);
    }

    var elements = document.querySelectorAll("rect." + className);
    elements.forEach(function (element) {
        var svgX = parseFloat(element.getAttribute("x"));
        var svgY = parseFloat(element.getAttribute("y"));
        var height = parseFloat(element.getAttribute("height"));
        var width = parseFloat(element.getAttribute("width"));
        var y = svgY + height / 2;
        var x = svgX + width / 2;

        var fill = element.getAttribute("fill");
        var isStatic = hasClass(element, "static");
        var rectBody = Matter.Bodies.rectangle(x, y, width, height, {
            isStatic: isStatic, className: element.classList.toString(), color: fill
        });

        Matter.World.add(engine.world, [rectBody]);

        if (!isStatic && !hasClass(element, "stay")) {
            element.remove();
        }
    });
}

