function step04() {
    var svg = d3.select("#svg04");
    const selection = svg.selectAll("circle")
        .data([
            {name:"a", x:100, y:100, r:20, color:"blue"},
            {name:"b", x:100, y:400, r:30, color:"orange"},
            {name:"c", x:600, y:400, r:40, color:"red"}
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

    setTimeout(function () {
        const selection = svg.selectAll("circle")
            .data([
                {name:"c", x:100, y:100, r:80, color:"grey"},
                {name:"a", x:100, y:400, r:10, color:"yellow"},
                {name:"b", x:400, y:400, r:60, color:"cyan"}
            ], function (d) {
                return d.name;
            });

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

    }, 8000);
}
