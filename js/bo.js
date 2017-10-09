'use strict';

/* global bottle */
/* global d3 */
/* global _ */

bottle.factory("Bo", function (container) {
    const SimplePromise = container.SimplePromise;
    const util = container.util;

    function Bo(drawFunc, count) {
        const that = this;
        const ready = new SimplePromise();
        var timeSeries;

        function read() {
            const readFinished = new SimplePromise();

            d3.json("bo.json", function (data) {
                timeSeries = _.orderBy(data, function (week) {
                    return week[0].date
                }, ['asc']);
                readFinished.resolve();
            });

            return readFinished.promise;
        }

        var ctr = -1;

        function addI(elements) {
            return elements.map(function (element, i) {
                const newElement = Object.assign({}, element);
                newElement.i = i;
                return newElement;
            });
        }

        function callDrawFunc(inc) {
            util.changeHashParam("date", timeSeries[ctr][0].date);
            const ordered = timeSeries[ctr].slice(0,count);
            const orderedWithI = addI(ordered);
            drawFunc(_.orderBy(orderedWithI, ['wg'], ['desc']), inc);
        }

        function goto(date) {
            for(var i = 0; i < timeSeries.length; i++) {
                if(timeSeries[i][0].date == date) {
                    ctr = i;
                    callDrawFunc();
                    break;
                }
            }
        }

        function next() {
            var inc = true;
            if(ctr < 0 || ctr >= timeSeries.length-1) {
                ctr = 0;
                inc = false;
            }
            else {
                ctr++;
            }
            callDrawFunc(inc);
        }

        function prev() {
            if(ctr <= 0) {
                ctr = timeSeries.length-1;
            }
            else {
                ctr--;
            }
            callDrawFunc(false);
        }

        read().then(function() {
            that.constructor.prototype.next = next;
            that.constructor.prototype.prev = prev;
            that.constructor.prototype.goto = goto;
            ready.resolve(timeSeries);
        });

        this.constructor.prototype.next = function () {};
        this.constructor.prototype.prev = function () {};
        this.constructor.prototype.goto = function () {};
        this.ready = ready.promise;
    }

    return  Bo;
});
