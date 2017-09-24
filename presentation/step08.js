function step08() {
    const svg = d3.select("#svg08");

    function draw(data) {
        const selection = svg.selectAll("circle")
            .data(data, function (d) {
                return d.name;
            });

        selection.enter()
            .append("circle")
            .attr("cx", 500)
            .attr("cy", 300)
            .attr("r", 5);

        svg.selectAll("circle")
            .transition()
            .duration(2000)
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d) {
                return d.color;
            });

        selection.exit()
            .transition()
            .duration(500)
            .attr("r", 0)
            .style("opacity", 0)
            .remove();
    }

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    setInterval(function () {
        const data = [];
        _.range(20).forEach(function(i) {
            if(_.random(0, 9) > 0) {
                data.push({
                    name: i,
                    x: _.random(0, 1000),
                    y: _.random(0, 600),
                    r: _.random(5, 50),
                    color: color(i)
                });
            }
        });

        draw(data);
    }, 2000);
}