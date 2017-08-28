'use strict';

/* global d3 */

function histogram(data, g, width, height) {
    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(500))
        (data);

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, height/2]);

    var bar = g.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + ",0)";
        });

    function _height(d) {
        return height - y(d.length);
    }

    bar.append("rect")
        .attr("class", "bin")
        .attr("x", 1)
        .attr("y", height/2)
        .attr("width", x(bins[0].x1) - x(bins[0].x0))
        .attr("height", height/2);

    g.selectAll("rect.bin")
        .transition()
        .duration(1000)
        .attr("y", function (d) {
            return height - _height(d);
        })
        .attr("height", _height);
}