'use strict';

/* global d3 */

const Drag = function (simulation) {
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    this.constructor.prototype.doit = function() {
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }
};

