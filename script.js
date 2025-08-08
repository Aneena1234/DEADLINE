/* ===== Curtain & Shatter Effect ===== */
function createShards() {
    const container = document.getElementById("shards-container");
    for (let i = 0; i < 20; i++) {
        const shard = document.createElement("div");
        shard.classList.add("glass-shard");
        container.appendChild(shard);

        const angle = Math.random() * 360;
        const distance = 50 + Math.random() * 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        shard.style.setProperty("--x", `${x}px`);
        shard.style.setProperty("--y", `${y}px`);
    }
}

window.addEventListener("load", () => {
    const curtain = document.getElementById("curtain");
    const curtainText = document.getElementById("curtainText");
    const curtainSubtitle = document.getElementById("curtainSubtitle");
    const loginContainer = document.getElementById("loginContainer");
    const shatterSound = document.getElementById("shatter-sound");

    if (curtain && curtainText && curtainSubtitle) {
        setTimeout(() => {
            curtainSubtitle.classList.add("show-subtitle");
        }, 500);

        setTimeout(() => {
            createShards();
            shatterSound.play();
            curtainText.classList.add("shatter");
            document.querySelectorAll(".glass-shard").forEach(shard => {
                shard.classList.add("fly");
            });
            curtainSubtitle.style.opacity = "0";
        }, 1500);

        setTimeout(() => {
            curtain.style.display = "none";
            loginContainer.style.display = "block";
        }, 2800);
    }
});

/* ===== Login Function ===== */
function login() {
    let name = document.getElementById("username").value.trim();
    if (name === "") {
        alert("Please enter your name!");
        return;
    }
    localStorage.setItem("username", name);
    window.location.href = "home.html";
}

/* ===== Fun Countdown Page Function ===== */
function startFunCountdown() {
    let dob = document.getElementById("dob").value;
    let symptoms = document.getElementById("symptoms").value.trim();
    let timerDisplay = document.getElementById("countdown-timer");
    let heartbeat = document.getElementById("heartbeat-sound");

    if (!dob) {
        alert("Please enter your date of birth!");
        return;
    }

    if (!symptoms) {
        alert("Please enter at least one funny symptom or life event!");
        return;
    }

    let birthYear = new Date(dob).getFullYear();
    let predictedAge = Math.floor(Math.random() * 40) + 40;
    let deathYear = birthYear + predictedAge;

    let funnyComment = "";
    if (symptoms.toLowerCase().includes("forget")) {
        funnyComment = "Your forgetfulness might make you miss your own funeral. 😅";
    } else if (symptoms.toLowerCase().includes("lazy")) {
        funnyComment = "You might just oversleep through the apocalypse. 🛌";
    } else if (symptoms.toLowerCase().includes("coffee")) {
        funnyComment = "Too much coffee might keep you alive forever... or not. ☕";
    } else {
        funnyComment = "The universe works in mysterious ways... 😈";
    }

    let countdown = 3;
    heartbeat.play();

    let interval = setInterval(() => {
        if (countdown > 0) {
            timerDisplay.innerHTML = `<span>${countdown}</span>`;
            countdown--;
        } else {
            clearInterval(interval);
            heartbeat.pause();
            timerDisplay.innerHTML = `
                💀 You will live until <span>${deathYear}</span> 💀
                <br><br>
                <i>${funnyComment}</i>
            `;
        }
    }, 1000);
}

/* ===== Future Page Judgment ===== */
function judge() {
    let deeds = document.getElementById("deeds").value.toLowerCase();
    let resultBox = document.getElementById("result");

    let hellSound = document.getElementById("hell-sound");
    let heavenSound = document.getElementById("heaven-sound");

    // Set Hell sound URL (evil laugh)
    hellSound.src = "https://www.myinstants.com/media/sounds/evil-laugh-1.mp3";

    if (!deeds.trim()) {
        alert("Please confess something first!");
        return;
    }

    const badWords = ["steal", "kill", "hurt", "cheat", "lie", "destroy", "fight", "chocolate"];
    const goodWords = ["help", "donate", "save", "love", "kind", "protect"];

    let isBad = badWords.some(word => deeds.includes(word));
    let isGood = goodWords.some(word => deeds.includes(word));

    hellSound.pause(); hellSound.currentTime = 0;
    heavenSound.pause(); heavenSound.currentTime = 0;

    if (isBad) {
        hellSound.play();
        resultBox.innerHTML = `<h2 class="hell-text">🔥 You are going to HELL! 🔥</h2><p>Your sins are too much to handle... even the devil is impressed 😈</p>`;
    } else if (isGood) {
        heavenSound.play();
        resultBox.innerHTML = `<h2 class="heaven-text">☁️ You are going to HEAVEN! ☁️</h2><p>You're a pure soul. Angels are already preparing your cloud 😇</p>`;
    } else {
        let randomFate = Math.random() > 0.5 ? "hell" : "heaven";
        if (randomFate === "hell") {
            hellSound.play();
            resultBox.innerHTML = `<h2 class="hell-text">🔥 You are going to HELL! 🔥</h2><p>The underworld awaits you... better bring sunscreen 😈</p>`;
        } else {
            heavenSound.play();
            resultBox.innerHTML = `<h2 class="heaven-text">☁️ You are going to HEAVEN! ☁️</h2><p>The gates are open, your harp is waiting 🎵</p>`;
        }
    }
}

/* ===== Dramatic Countdown Function ===== */
function predictDeath() {
    let dobInput = document.getElementById("dob").value;
    let symptoms = document.getElementById("symptoms").value.toLowerCase();

    if (!dobInput) {
        alert("Please enter your Date of Birth!");
        return;
    }

    let dob = new Date(dobInput);
    let baseLife = 72;

    let badHabits = ["smoke", "drink", "chips", "maggi", "no sleep", "burger", "pizza", "junk"];
    let goodHabits = ["exercise", "yoga", "healthy", "fruit", "vegetable", "meditate"];

    if (badHabits.some(habit => symptoms.includes(habit))) {
        baseLife -= Math.floor(Math.random() * 15) + 3;
    }
    if (goodHabits.some(habit => symptoms.includes(habit))) {
        baseLife += Math.floor(Math.random() * 5) + 1;
    }

    baseLife += Math.floor(Math.random() * 5) - 2;

    let deathYear = dob.getFullYear() + baseLife;
    let deathDate = new Date(`December 31, ${deathYear} 23:59:59`).getTime();

    document.getElementById("form-section").style.display = "none";
    let dramaticCount = document.getElementById("dramatic-count");
    dramaticCount.style.display = "block";

    document.getElementById("suspense-sound").play();

    let count = 3;
    dramaticCount.textContent = count;

    let interval = setInterval(() => {
        count--;
        if (count > 0) {
            dramaticCount.textContent = count;
        } else {
            clearInterval(interval);
            dramaticCount.style.display = "none";
            showResult(deathYear, deathDate);
        }
    }, 1000);
}

function showResult(deathYear, deathDate) {
    document.getElementById("result-section").style.display = "block";
    document.getElementById("death-date").textContent =
        `💀 Predicted Death Date: 31 Dec ${deathYear}`;

    let heartbeatSound = document.getElementById("heartbeat-sound");
    heartbeatSound.play();

    function updateCountdown() {
        let now = new Date().getTime();
        let timeLeft = deathDate - now;

        if (timeLeft <= 0) {
            document.getElementById("timer").innerHTML = "💀 You're out of time!";
            heartbeatSound.pause();
            return;
        }

        let years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
        let days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML =
            `<span>${years}</span> years 
             <span>${days}</span> days 
             <span>${hours}</span> hrs 
             <span>${minutes}</span> mins 
             <span>${seconds}</span> secs`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
function judge() {
    let deeds = document.getElementById("deeds").value.toLowerCase();
    let resultBox = document.getElementById("result");

    let hellSound = document.getElementById("hell-sound");
    let heavenSound = document.getElementById("heaven-sound");

    if (!deeds.trim()) {
        alert("Please confess something first!");
        return;
    }

    const badWords = ["steal", "kill", "hurt", "cheat", "lie", "destroy", "fight", "chocolate"];
    const goodWords = ["help", "donate", "save", "love", "kind", "protect"];

    let isBad = badWords.some(word => deeds.includes(word));
    let isGood = goodWords.some(word => deeds.includes(word));

    hellSound.pause(); hellSound.currentTime = 0;
    heavenSound.pause(); heavenSound.currentTime = 0;

    // Try to play after user action
    const playHell = () => hellSound.play().catch(err => console.log("Hell sound blocked:", err));
    const playHeaven = () => heavenSound.play().catch(err => console.log("Heaven sound blocked:", err));

    if (isBad) {
        playHell();
        resultBox.innerHTML = `<h2 class="hell-text">🔥 You are going to HELL! 🔥</h2>
                               <p>Your sins are too much to handle... even the devil is impressed 😈</p>`;
    } else if (isGood) {
        playHeaven();
        resultBox.innerHTML = `<h2 class="heaven-text">☁️ You are going to HEAVEN! ☁️</h2>
                               <p>You're a pure soul. Angels are already preparing your cloud 😇</p>`;
    } else {
        let randomFate = Math.random() > 0.5 ? "hell" : "heaven";
        if (randomFate === "hell") {
            playHell();
            resultBox.innerHTML = `<h2 class="hell-text">🔥 You are going to HELL! 🔥</h2>
                                   <p>The underworld awaits you... better bring sunscreen 😈</p>`;
        } else {
            playHeaven();
            resultBox.innerHTML = `<h2 class="heaven-text">☁️ You are going to HEAVEN! ☁️</h2>
                                   <p>The gates are open, your harp is waiting 🎵</p>`;
        }
    }
}
