function step03() {
    var svg = d3.select("#svg03");
    const selection = svg.selectAll("circle")
        .data([
            {name: "a", x: 100, y: 100, r: 20, color: "blue"},
            {name: "b", x: 100, y: 400, r: 30, color: "orange"},
            {name: "c", x: 600, y: 400, r: 40, color: "red"}
        ]);

    selection
        .transition()
        .duration(5000)
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
        })
}
