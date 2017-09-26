'use strict';

/* global bottle */

bottle.factory("Countdown", function (container) {

    function _now() {
        return (new Date()).getTime();
    }

    function formatWithLeadingZero(num) {
        return num  < 10 ? "0" + String(num) : String(num);
    }

    function Countdown(minutes) {
        const start = _now();

        function getRemaining() {
            const now = _now();
            const secondsSinceStart = Math.floor((now - start) / 1000);
            const secondsToEnd = minutes*60 - secondsSinceStart;
            const fullMinutesToEnd = Math.floor(secondsToEnd/60);
            const restSecondsToEnd = secondsToEnd%60;
            const formattedFullMinutes = formatWithLeadingZero(fullMinutesToEnd);
            const formattedRestSecondsToEnd = formatWithLeadingZero(restSecondsToEnd);

            return formattedFullMinutes + ":" + formattedRestSecondsToEnd;
        }

        this.constructor.prototype.getRemaining = getRemaining;
    }

    return Countdown;
});
