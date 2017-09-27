function step07() {
    const svg = d3.select("#svg07");
    const selection = svg.selectAll("circle")
        .data([
            {name:"a", x:100, y:100, r:20, color:"blue"},
            {name:"b", x:100, y:400, r:30, color:"orange"},
            {name:"c", x:600, y:400, r:40, color:"red"}
        ]);

    selection.enter()
        .append("circle")
        .attr("cx", 500)
        .attr("cy", 300)
        .attr("r", 5)
        .merge(selection)
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

    setTimeout(function () {
        const selection = svg.selectAll("circle")
            .data([
                {name:"c", x:100, y:100, r:80, color:"grey"},
                {name:"d", x:600, y:100, r:100, color:"green"},
                {name:"b", x:600, y:400, r:60, color:"cyan"}
            ], function (d) {
                return d.name;
            });

        const newElements = selection.enter()
            .append("circle")
            .attr("cx", 500)
            .attr("cy", 300)
            .attr("r", 5);

        newElements.merge(selection)
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

        selection.exit()
            .transition()
            .duration(5000)
            .attr("r", 0)
            .style("opacity", 0)
            .remove();
    }, 5500);
}