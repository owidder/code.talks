'use strict';

/* global bottle */

bottle.factory("drawBubbles", function(container) {
    function drawBubbles(svg, width, height) {
        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory20c);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);

        d3.csv("flare.csv", function(d) {
            d.value = +d.value;
            if (d.value) return d;
        }, function(error, classes) {
            if (error) throw error;

            var root = d3.hierarchy({children: classes})
                .sum(function(d) { return d.value; })
                .each(function(d) {
                    if (id = d.data.id) {
                        var id, i = id.lastIndexOf(".");
                        d.id = id;
                        d.package = id.slice(0, i);
                        d.class = id.slice(i + 1);
                    }
                });

            var node = svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            node.append("circle")
                .attr("id", function(d) {
                    return d.id;
                })
                .attr("r", function(d) {
                    return d.r;
                })
                .style("fill", function(d) {
                    return color(d.package);
                });

            node.append("clipPath")
                .attr("id", function(d) {
                    return "clip-" + d.id;
                })
                .append("use")
                .attr("xlink:href", function(d) {
                    return "#" + d.id;
                });

            node.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
                .attr("class", "node")
                .text(function (d) {
                    return d.class;
                })
                .style("font-size", function (d) {
                    return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px";
                })
                .attr("dx", function (d) {
                    return -d.r;
                })
                .attr("dy", ".35em");

            node.append("title")
                .text(function(d) {
                    return d.id + "\n" + format(d.value);
                });
        });
    }

    return drawBubbles;
});
