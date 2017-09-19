'use strict';

/* global Matter */

function MatterD3Renderer(_engine, _gBodies, width, height, _gConstraints) {
    var engine = _engine;

    function isCircle(body) {
        return body.label.toLowerCase().startsWith("circle");
    }

    function hasTitle(body) {
        return body.title != null;
    }

    function createPathFromBody(d) {
        var pathStr = "";
        if(d.vertices.length > 0) {
            pathStr += "M" + d.vertices[0].x + " " + d.vertices[0].y;
            if(d.vertices.length > 1) {
                var i;
                for(i = 1; i < d.vertices.length; i++) {
                    pathStr += " L" + d.vertices[i].x + " " + d.vertices[i].y;
                }
            }
        }
        pathStr += " Z";

        return pathStr;
    }

    function createClassNameFromBody(d) {
        var className = "dynamic";
        if(d.className != null) {
            return className + " " + d.className;
        }
        else {
            return className;
        }
    }

    function renderD3Img() {
        var dynamicImg= Matter.Composite.allBodies(engine.world).filter(function (b) {
            return b.img != null;
        });

        var data = _gBodies.selectAll("image.dynamic")
            .data(dynamicImg, function (d) {
                return d.id;
            });

        function width(d) {
            if(d.imgWidth != null) {
                return d.imgWidth;
            }
            else if(isCircle(d)) {
                return d.circleRadius * 2;
            }
            return d.bounds.max.x - d.bounds.min.x;
        }

        function height(d) {
            if(d.imgHeight != null) {
                return d.imgHeight;
            }
            else if(isCircle(d)) {
                return d.circleRadius * 2;
            }
            return d.bounds.max.y - d.bounds.min.y;
        }

        function x(d) {
            if(isCircle(d)) {
                if(d.imgWidth != null) {
                    return d.position.x - d.imgWidth/2;
                }
                return d.position.x - d.circleRadius;
            }
            return d.bounds.min.x;
        }

        function y(d) {
            if(isCircle(d)) {
                if(d.imgHeight != null) {
                    return d.position.y - d.imgHeight/2;
                }
                return d.position.y - d.circleRadius;
            }
            return d.bounds.min.y;
        }

        data.enter()
            .append("svg:image")
            .attr("class", "dynamic")
            .attr("width", width)
            .attr("height", height)
            .attr("xlink:href", function (d) {
                return d.img;
            });

        _gBodies.selectAll("image.dynamic")
            .attr("x", x)
            .attr("y", y)
            .attr("transform", function (d) {
                if(d.imgRotation) {
                    return "rotate(" + (d.angle / (Math.PI*2) * 360) + " " + (x(d) + width(d)/2) + " " + (y(d) + height(d)/2) +")";
                }
                return "";
            });

        data.exit().remove();
    }

    function renderD3Bodies() {
        var dynamic = Matter.Composite.allBodies(engine.world).filter(function (b) {
            return (b.img == null && !b.doNotShow);
        });

        var data = _gBodies.selectAll("path.dynamic")
            .data(dynamic, function(d) {
                return d.id;
            });

        data.enter()
            .append("path")
            .attr("class", createClassNameFromBody)
            .attr("_legend", function (d) {
                return d._legend != null ? d._legend : undefined;
            })
            .style("fill", function (d) {
                return d.color != null ? d.color : undefined;
            })
            .style("stroke", function(d) {
                return d.strokeColor != null ? d.strokeColor : undefined;
            })
            .style("stroke-width", function(d) {
                return d.strokeWidth != null ? d.strokeWidth : undefined;
            });


        _gBodies.selectAll("path.dynamic")
            .attr("d", createPathFromBody);

        data.exit().remove();
    }

    function center(d) {
        return {
            x: (d.bounds.max.x + d.bounds.min.x)/2,
            y: (d.bounds.max.y + d.bounds.min.y)/2
        }
    }

    function renderD3Titles() {
        var bodiesWithTitles = Matter.Composite.allBodies(engine.world).filter(hasTitle);

        var data = _gBodies.selectAll("text.dynamic")
            .data(bodiesWithTitles, function(d) {
                return d.id;
            });

        data.enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("class", "dynamic")
            .text(function(d) {
                return d.title;
            });

        _gBodies.selectAll("text.dynamic")
            .attr("x", function(d) {
                return center(d).x;
            })
            .attr("y", function(d) {
                return center(d).y;
            })
            .attr("transform", function(d) {
                var c = center(d);
                return "rotate(" + (d.angle / (2*Math.PI) * 360) + "," + (c.x)+ "," + (c.y) + ")";
            });

        data.exit().remove();
    }

    function isVisible(constraint) {
        return constraint.render && constraint.render.visible;
    }

    function renderD3Constraints() {
        var constraints = Matter.Composite.allConstraints(engine.world).filter(isVisible);

        var data = _gConstraints.selectAll("line.constraint")
            .data(constraints, function (d) {
                return d.id;
            });

        data.enter()
            .append("line")
            .attr("class", "constraint")
            .style("stroke-width", function (d) {
                return d.render.lineWidth + "px;";
            });

        _gConstraints.selectAll("line.constraint")
            .attr("x1", function (d) {
                return d.bodyA.position.x;
            })
            .attr("y1", function (d) {
                return d.bodyA.position.y;
            })
            .attr("x2", function (d) {
                if(d.bodyB) {
                    return d.bodyB.position.x;
                }
                else {
                    return d.pointB.x;
                }
            })
            .attr("y2", function (d) {
                if(d.bodyB) {
                    return d.bodyB.position.y;
                }
                else {
                    return d.pointB.y;
                }
            });

        data.exit().remove();
    }

    function deleteConstraints() {
        Matter.Composite.allConstraints(engine.world).forEach(function (constraint) {
            Matter.World.remove(engine.world, constraint);
        })
    }

    function deleteBodies() {
        Matter.Composite.allBodies(engine.world).forEach(function (body) {
            Matter.World.remove(engine.world, body);
        });
    }

    this.constructor.prototype.deleteWorld = function () {
        deleteConstraints();
        deleteBodies();
    };

    this.constructor.prototype.startGc = function(interval) {
        var that = this;

        function gc() {
            function isDynamic(body) {
                return !body.isStatic;
            }
            var dynamicBodies = Matter.Composite.allBodies(engine.world).filter(isDynamic);
            dynamicBodies.forEach(function(body) {
                if(body.position.y > height) {
                    Matter.World.remove(engine.world, body);
                }
            })
        }

        return setInterval(gc, interval);
    };

    this.constructor.prototype.renderD3 = function() {
        if(_gBodies != null) {
            renderD3Img();
            renderD3Bodies();
            renderD3Titles();
            if(_gConstraints) {
                renderD3Constraints();
            }
        }
    }
}

if(typeof module !== 'undefined') {
    module.exports = MatterD3Renderer;
}
