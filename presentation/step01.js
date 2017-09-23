function step01() {
    var svg = d3.select("#svg01");
    const selection = svg.selectAll("circle")
        .data([
            {name: "a", x: 100, y: 100, r: 20, color: "blue"},
            {name: "b", x: 100, y: 400, r: 30, color: "orange"},
            {name: "c", x: 600, y: 400, r: 40, color: "red"}
        ]);

    console.log(document.querySelectorAll("#svg01 circle"));
}
