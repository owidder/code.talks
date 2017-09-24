function matterExample() {
    const engine = Matter.Engine.create();
    Matter.Engine.run(engine);

    const body = Matter.Bodies.circle(100, 100, 10, {
        isStatic: false
    });

    Matter.World.add(engine.world, [body]);

    Matter.Events.on(engine, "afterUpdate", function () {
        document.querySelector("h1#matterdemo").innerHTML = body.position.y;
    });

    window.__p.engine = engine;
}