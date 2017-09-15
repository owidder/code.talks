'use strict';

/* global botlle */
/* global d3 */
/* global _ */

bottle.factory("Bo", function (container) {
    const SimplePromise = container.SimplePromise;

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

        function next() {
            if(ctr < 0 || ctr >= timeSeries.length-1) {
                ctr = 0;
            }
            else {
                ctr++;
            }
            drawFunc(_.orderBy(timeSeries[ctr].slice(0,count), ['wg'], ['desc']));
        }

        function prev() {
            if(ctr <= 0) {
                ctr = timeSeries.length-1;
            }
            else {
                ctr--;
            }
            drawFunc(_.orderBy(timeSeries[ctr].slice(0, count), ['wg'], ['desc']));
        }

        read().then(function() {
            that.constructor.prototype.next = next;
            that.constructor.prototype.prev = prev;
            ready.resolve(timeSeries);
        });

        this.constructor.prototype.next = function () {};
        this.constructor.prototype.prev = function () {};
        this.ready = ready.promise;
    }

    return  Bo;
});
