function ConstraintsDemo(selector, width, height, stiffness, length, gravityX, gravityY) {
    const  svg = d3.select(selector)
        .on("click", function () {
            const evt = d3.mouse(this);
            createCircle(evt[0], evt[1]);
        });

    const constraintG = svg.append("g");
    const dynG = svg.append("g");

    const engine = Matter.Engine.create();

    !isNaN(gravityX) && (engine.world.gravity.x = gravityX);
    !isNaN(gravityY) && (engine.world.gravity.y = gravityY);

    Matter.Engine.run(engine);

    var d3Renderer = new MatterD3Renderer(engine, dynG, width, height, constraintG);
    Matter.Events.on(engine, "afterUpdate", function () {
        d3Renderer.renderD3();
    });

    function createCircle(x, y) {
        const circle = Matter.Bodies.circle(x, y, 8, {
            isStatic: false, color: "blue"
        });
        const constraint = Matter.Constraint.create({bodyA: circle, pointB: {x: width/2, y:height/2},
            length: length,
            stiffness: stiffness,
            render: {lineWidth: 1}
        });
        Matter.World.add(engine.world, [circle, constraint]);
    }
}