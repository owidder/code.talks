function startCountdown() {

    const countdown = new Countdown(10);

    setInterval(function () {
        const remaining = countdown.getRemaining();
        document.querySelectorAll("h5.timer").forEach(function (element) {
            element.innerHTML = remaining;
        })
    })
}