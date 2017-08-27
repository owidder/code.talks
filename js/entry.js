/* global Matter */

const d3 = require('d3');

const MatterD3Renderer = require('./matterD3Renderer');

const  svg = d3.select("#svgcanvas")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

const engine = Matter.Engine.create();

Matter.Engine.run(engine);

var d3Renderer = new MatterD3Renderer(engine, svg);
Matter.Events.on(engine, "afterUpdate", function () {
    d3Renderer.renderD3();
});
