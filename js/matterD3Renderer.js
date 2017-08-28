'use strict';

/* global Matter */

function MatterD3Renderer(_engine, svg, width, height) {
    var _g = svg;
    var engine = _engine;

    function isStatic(body) {
        return body.isStatic;
    }

    function isDynamic(body) {
        return !body.isStatic;
    }

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

        var data = _g.selectAll("image.dynamic")
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

        _g.selectAll("image.dynamic")
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

        var data = _g.selectAll("path.dynamic")
            .data(dynamic, function(d) {
                return d.id;
            });

        data.enter()
            .append("path")
            .attr("class", createClassNameFromBody)
            .style("fill", function (d) {
                return d.color != null ? d.color : "black";
            })
            .style("stroke", function(d) {
                return d.strokeColor != null ? d.strokeColor : "black";
            })
            .style("stroke-width", function(d) {
                return d.strokeWidth != null ? d.strokeWidth : "0px";
            });


        _g.selectAll("path.dynamic")
            .attr("d", createPathFromBody);

        data.exit().remove();
    }

    function renderD3Titles() {
        var bodiesWithTitles = Matter.Composite.allBodies(engine.world).filter(hasTitle);

        if(bodiesWithTitles.length > 0) {
            var data = _g.selectAll("text.dynamic")
                .data(bodiesWithTitles, function(d) {
                    return d.id;
                });

            data.enter()
                .append("text")
                .attr("class", "dynamic")
                .text(function(d) {
                    return d.title;
                });

            _g.selectAll("text.dynamic")
                .attr("x", function(d) {
                    var avx = (d.bounds.max.x + d.bounds.min.x) / 2 - 20;
                    return avx;
                })
                .attr("y", function(d) {
                    var avy = (d.bounds.max.y + d.bounds.min.y) / 2 - 15;
                    return avy;
                });
        }

    }

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
        if(_g != null) {
            renderD3Img();
            renderD3Bodies();
            renderD3Titles();
        }
    }
}

if(typeof module !== 'undefined') {
    module.exports = MatterD3Renderer;
}
