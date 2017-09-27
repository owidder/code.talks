function addBodiesRecursive(data, index) {
    setTimeout(function () {
        const d = data[index];

        const circleBody = Matter.Bodies.circle(randomX(), randomY(), d.r, {
            isStatic: false
        });

        const constraint = Matter.Constraint.create({
            bodyA: circleBody,
            pointB: {x:window.innerWidth/2, y:window.innerHeight/2},
            stiffness: 0.0001
        });

        Matter.World.add(engine.world, [circleBody, constraint]);

        if(index < data.length-1) {
            addBodiesRecursive(data, index+1);
        }

        d.body = circleBody;
    }, 10);
}
