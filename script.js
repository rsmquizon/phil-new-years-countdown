const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

// Mute videos initially
video1.muted = true;
video2.muted = true;

// Unmute after user interaction (click anywhere)
document.body.addEventListener('click', function () {
    video1.muted = false;
    video2.muted = false;
});

let countdownTimer;

function updateCountdown() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const timeDiff = newYear - now;

    const timerElement = document.getElementById('timer');
    const countdownTitle = document.getElementById('countdown-title');

    if (timeDiff <= 0) {
        video1.classList.remove('active');
        video2.classList.add('active');
        timerElement.textContent = "";
        countdownTitle.style.display = "none";
        timerElement.style.display = "none";
        clearInterval(countdownTimer);
    } else {
        video1.classList.add('active');
        video2.classList.remove('active');
    }

    if (timeDiff <= 60000) {
        const seconds = Math.floor(timeDiff / 1000);
        timerElement.textContent = seconds;

        if (seconds <= 60) {
            timerElement.classList.add('heartbeat');
            setTimeout(() => {
                timerElement.classList.remove('heartbeat');
            }, 800);
        }
    } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        timerElement.classList.remove('heartbeat');
    }
}

updateCountdown();
countdownTimer = setInterval(updateCountdown, 1000);
