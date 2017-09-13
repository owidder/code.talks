'use strict';

/* global botlle */
/* global d3 */

bottle.factory("Politbarometer", function (container) {
    const SimplePromise = container.SimplePromise;

    function Politbarometer(drawFunc) {
        const that = this;
        const ready = new SimplePromise();
        const timeSeries = [];

        function read() {
            const readFinished = new SimplePromise();

            d3.csv("politbarometer.csv", function (csv) {
                csv.forEach(function (poll) {
                    const data = [];
                    _.forOwn(poll, function (grade, name) {
                        if(name != "Datum") {
                            if(grade != null && grade.length > 0) {
                                data.push({name: name, grade: grade, date: poll.Datum});
                            }
                        }
                    });
                    timeSeries.push(data);
                });
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
            drawFunc(_.orderBy(timeSeries[ctr], ['grade'], ['desc']));
        }

        function prev() {
            if(ctr <= 0) {
                ctr = timeSeries.length-1;
            }
            else {
                ctr--;
            }
            drawFunc(_.orderBy(timeSeries[ctr], ['grade'], ['desc']));
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

    return  Politbarometer;
});
