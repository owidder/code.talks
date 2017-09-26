'use strict';

/* global bottle */
/* global d3 */

bottle.factory("drawBechdelPack", function(container) {
    function drawBechdelPack(svg, width, height, quota) {
        var format = d3.format(",d");

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);

        d3.csv("bechdel.csv", function(d) {
            d.value = +d.budget;
            d.id = d.imdb;
            if (d.value && Math.random() < (quota ? quota : 1)) return d;
        }, function(error, movies) {
            if (error) throw error;

            var root = d3.hierarchy({children: movies})
                .sum(function(d) { return d.value; });

            var enter = svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            enter.append("circle")
                .attr("class", "node forlegend")
                .attr("id", function(d) {
                    return d.data.id;
                })
                .attr("_legend", function (d) {
                    return d.data.year + " / " + d.data.title + " / " + format(d.value);
                })
                .attr("r", function(d) {
                    return d.r;
                })
                .style("fill", function(d) {
                    return d.data.binary == 'FAIL' ? "red" : "blue";
                });

            enter.append("clipPath")
                .attr("id", function(d) {
                    return "clip-" + d.data.id;
                })
                .append("use")
                .attr("xlink:href", function(d) {
                    return "#" + d.data.id;
                });

            enter.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
                .attr("class", "node")
                .text(function (d) {
                    return d.data.year;
                })
                .style("font-size", function (d) {
                    return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px";
                })
                .attr("dx", function (d) {
                    return -d.r;
                })
                .attr("dy", ".35em");

        });
    }

    return drawBechdelPack;
});
