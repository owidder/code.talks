'use strict';

bottle.factory("Engine", function (container) {

    const Engine = function() {
        var engine;
        var runner;
        
        function start(tickFunc) {
            engine = Matter.Engine.create();
            runner = Matter.Engine.run(engine);
            Matter.Events.on(engine, "afterUpdate", function () {
                tickFunc();
            });
            this.world = engine.world;
        }

        function stop() {
            const that = this;
            Matter.World.clear(engine.world, false, true);
            Matter.Events.on(engine, "afterTick", function () {
                Matter.Runner.stop(runner);
                runner = undefined;
                engine = undefined;
                delete that.world;
            });
        }


        this.constructor.prototype.start = start;
        this.constructor.prototype.stop = stop;
    };

    return Engine;

});