{
    let status = "stopped";
    let currentTime = 0;
    let timer = null;
    let wakeLock = null;

    async function start() {
        if (wakeLock == null) {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
            }
            catch (err) {
                console.log(err);
            }
        }
        setStatus("running");
        timer = setInterval(step, 1000);
    }

    function stop() {
        setStatus("stopped");
        clearInterval(timer);
    }

    function reset() {
        currentTime = 0;
        setLabel();
    }

    function setStatus(new_status) {
        status = new_status;
        document.querySelector(".main").className = `main ${status}`;
    }

    function setLabel() {
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        document.querySelector(".minutes").innerText = minutes;
        document.querySelector(".seconds").innerText = seconds;
    }

    function step() {
        currentTime += 1;
        setLabel();
    }

    function init() {
        document.querySelector("#start").addEventListener("click", start);
        document.querySelector("#stop").addEventListener("click", stop);
        document.querySelector("#reset").addEventListener("click", reset);
    }
    
    init();
}
