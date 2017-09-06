'use strict';

bottle.factory("Svg", function (container) {
    const Legend = container.Legend;

    function Svg(selector, width, height) {
        const svg = d3.select(selector)
            .append("svg")
            .attr("width", width*2)
            .attr("height", height*2);

        const drawingG = svg.append("g");
        const legendG = svg.append("g");

        const legend = new Legend(selector + " svg", 1, legendG);

        svg.on("mousemove", function () {
                const evt = d3.mouse(this);
                legend.mouseMoved(evt[0], evt[1]);
            })
            .on("mouseout", function () {
                legend.hideLegend();
            });

        legend.appendLegend();

        this.drawingG = drawingG;
    }

    return Svg;
});
