"use strict";

const body = document.querySelector("body");
const timeShow = document.querySelector(".stopwatch__time-show");
const allBtns = document.querySelector(".stopwatch__btns");
const start = document.querySelector(".stopwatch__btns-start");
const reset = document.querySelector(".stopwatch__btns-reset");
const stop = document.querySelector(".stopwatch__btns-stop");
const resume = document.querySelector(".stopwatch__btns-resume");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const milliseconds = document.querySelector(".milliseconds");

//? STARTING CONDITIONS FOR THE TIMEOUT
let timerMilliseconds = 0;
let timerSeconds = 0;
let timerMinutes = 0;
let intervalID;

//? FUNCTIONS
const repeated = function () {
  timerMilliseconds++;
  timerMilliseconds = String(timerMilliseconds).padStart(2, "0");
  milliseconds.textContent = `${timerMilliseconds}`;
  if (Number(timerMilliseconds) === 100) {
    milliseconds.textContent = "00";

    timerMilliseconds = 0;
    timerSeconds++;
    timerSeconds = String(timerSeconds).padStart(2, "0");
    seconds.textContent = `${timerSeconds}`;

    if (Number(timerSeconds) === 60) {
      seconds.textContent = "00";
      timerMilliseconds = 0;
      timerSeconds = 0;
      timerMinutes++;
      timerMinutes = String(timerMinutes).padStart(2, "0");
      minutes.textContent = `${timerMinutes}`;
    }
  }
};

const timer = function () {
  intervalID = setInterval(repeated, 10);
};
const stopTimer = function () {
  clearInterval(intervalID);
};

const display = function (name, active, hidden) {
  name.classList.add(active);
  name.classList.remove(hidden);
};

//? EVENT LISTENERS

allBtns.addEventListener("click", function (e) {
  if (e.target.classList.contains("stopwatch__btns-start")) {
    console.log(1);
    body.classList.add("resume-active");
    reset.classList.add("reset-new");
    e.target.classList.add("hidden");
    display(stop, "active", "hidden");
    timer();
  } else if (e.target.classList.contains("stopwatch__btns-reset")) {
    console.log(2);
    body.classList.remove("resume-active");
    body.classList.remove("stop-active");
    reset.classList.remove("reset-new");
    display(stop, "hidden", "active");
    display(start, "active", "hidden");
    display(resume, "hidden", "active");

    stopTimer();
    timerMilliseconds = 0;
    timerSeconds = 0;
    timerMinutes = 0;
    minutes.textContent = "00";
    seconds.textContent = "00";
    milliseconds.textContent = "00";
  } else if (e.target.classList.contains("stopwatch__btns-stop")) {
    body.classList.remove("resume-active");
    body.classList.add("stop-active");
    display(stop, "hidden", "active");
    display(resume, "active", "hidden");
    stopTimer();
  } else if (e.target.classList.contains("stopwatch__btns-resume")) {
    body.classList.remove("stop-active");
    body.classList.add("resume-active");
    display(resume, "hidden", "active");
    display(stop, "active", "hidden");
    timer();
  }
});
