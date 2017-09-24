function matterDemo(width, height) {
    const svg = d3.select("svg.matterdemo")
        .on("click", function () {
            const evt = d3.mouse(this);
            createCircle(evt[0], evt[1]);
        });

    const dynG = svg.append("g");

    const engine = Matter.Engine.create();

    Matter.Engine.run(engine);

    var d3Renderer = new MatterD3Renderer(engine, dynG, width, height);
    Matter.Events.on(engine, "afterUpdate", function () {
        d3Renderer.renderD3();
    });

    function createCircle(x, y) {
        const circle = Matter.Bodies.circle(x, y, 8, {
            isStatic: false, color: "blue"
        });

        Matter.World.add(engine.world, [circle]);
    }

    function createRect() {
        var rect = Matter.Bodies.rectangle(width/2, 4 * height/5, 5*width/10, 30, {
            isStatic: true, color: "grey"
        });

        Matter.Body.rotate(rect, 15 / 180 * Math.PI);

        Matter.World.add(engine.world, [rect]);
    }

    createRect();
}