'use strict';

/* global d3 */
/* global document */


bottle.factory("Legend", function (container) {

    var util = container.util;
    var svgUtil = container.svgUtil;

    function Legend(svgSelector, _radius, layer) {

        var radius = _radius || 10;

        function svg() {
            return d3.select(svgSelector);
        }

        function legendLayer() {
            if(!_.isEmpty(layer)) {
                return layer;
            }
            return svg();
        }

        function getSvgBoundingRectOfElement(selector) {
            var element = document.querySelector(selector);
            if (element != null) {
                return element.getBoundingClientRect();
            }
            else {
                return {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                };
            }

            return boundingRect;
        }

        function adaptPositionToElement(x, y, selector) {
            var svgBoundingRect = getSvgBoundingRectOfElement(selector);
            var xAdapted = x + svgBoundingRect.left;
            var yAdapted = y + svgBoundingRect.top;

            return {
                x: xAdapted,
                y: yAdapted
            }
        }

        function adaptPositionToSvg(x, y) {
            return adaptPositionToElement(x, y, svgSelector)
        }

        function getNearbyBubblesForlegends(x, y) {
            var adapted = svgUtil.adaptPositionToSvg(x, y, svgSelector);
            var forlegends = document.querySelectorAll(".forlegend");
            var i, forlegend, boundingRect;
            var nearbyBubblesForlegends = [];
            for (i = 0; i < forlegends.length; i++) {
                forlegend = forlegends[i];
                boundingRect = forlegend.getBoundingClientRect();
                if (adapted.x > boundingRect.left - radius && adapted.x < boundingRect.right + radius &&
                    adapted.y > boundingRect.top - radius && adapted.y < boundingRect.bottom + radius) {
                    nearbyBubblesForlegends.push(forlegend);
                }
            }

            return nearbyBubblesForlegends;
        }

        function createLegendList(elementList) {
            var legendList = [];
            var legendStr;
            var i, svgElement;
            for (i = 0; i < elementList.length; i++) {
                svgElement = elementList[i];
                legendStr = svgElement.getAttribute("_legend");
                if (!_.isEmpty(legendStr)) {
                    legendList.push(legendStr)
                }
            }

            return legendList;
        }

        function switchLegend() {
            if (isLegendShown()) {
                hideLegend();
            }
            else {
                showLegend();
            }
        }

        function isLegendShown() {
            return svg().select("g.legend.on").size() > 0;
        }

        function hideLegend() {
            var legend = svg().select("g.legend");
            legend.classed("on", false);
            legend.classed("off", true);
        }

        function showLegend() {
            var legend = svg().select("g.legend");
            legend.classed("off", false);
            legend.classed("on", true);
        }

        function appendLegend() {
            var legend = legendLayer().append("g")
                .attr("class", "legend off");

            legend.append("rect")
                .attr("class", "legend")
                .attr("fill", "grey")
                .attr("width", 100)
                .attr("height", 100)
                .attr("stroke", "white")
                .attr("opacity", 0.8);

            legend.append("text")
                .attr("class", "legend")
                .attr("fill", "white");
        }

        function updateLegend(legendList) {
            if(_.isEmpty(legendList)) {
                hideLegend();
            }
            else {
                showLegend();
            }

            var maxLength = util.getLongestString(legendList);

            var legendRect = svg().select("rect.legend");
            legendRect.transition()
                .attr("height", (legendList.length + 2) + "em")
                .attr("width", (maxLength + 1) * (2 / 3) + "em");

            var legendText = svg().select("text.legend");
            var legendData = legendText.selectAll(".textline")
                .data(legendList);

            legendData.enter()
                .append("tspan")
                .attr("font-size", "0.5em")
                .attr("class", "textline")
                .attr("x", "0.6em")
                .attr("y", function (d, i) {
                    return (i + 1) * 15;
                });

            legendText.selectAll(".textline")
                .text(function (d) {
                    return d;
                });

            legendData.exit().remove();

            if (legendList.length == 0) {
                hideLegend();
            }
            else {
                showLegend();
            }
        }

        function createLegendListAtPos(x, y) {
            var nearbyBubblesForlegends = getNearbyBubblesForlegends(x, y);
            var legendList = createLegendList(nearbyBubblesForlegends);
            return legendList;
        }

        function mouseMoved(x, y) {
            var legend = createLegendListAtPos(x, y);
            updateLegend(legend);

            svg().select("g.legend")
                .attr("transform", "translate(" + (x + 10) + "," + (y + 10) + ")");

            return legend;
        }

        this.mouseMoved = mouseMoved;
        this.hideLegend = hideLegend;
        this.showLegend = showLegend;
        this.switchLegend = switchLegend;
        this.appendLegend = appendLegend;
        this.createLegendListAtPos = createLegendListAtPos;
    }

    return Legend;
});