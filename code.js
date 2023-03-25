// load
function load() {
    setInterval(setTimeNow, 1000);
    document.getElementById("chronometerRow3").children.item(0).setAttributeNode(disableAttr1);
}

// Tabs ----------------------------------------------------------------------
function changePage(targetId, callerId) {
    const callerElement = document.getElementById(callerId);
    const targetElement = document.getElementById(targetId);

    for (let child of document.querySelectorAll("li.nav-item")) {
        if (child === callerElement) {
            child.style.backgroundColor = "rgb(10, 10, 10)";
            child.firstElementChild.className = child.firstElementChild.className.replace("text-white", "text-info");
        }
        else {
            child.style.backgroundColor = "rgb(60, 60, 60)";
            child.firstElementChild.className = child.firstElementChild.className.replace("text-info", "text-white");
        }
    }
    for (let el of document.querySelectorAll("div[id*='Section']")) {
        if (el === targetElement) {
            el.style.animation = "animation2 1s ease-out 1";
            el.className = el.className.replace("d-none", "d-flex");
        }
        else {
            el.className = el.className.replace("d-flex", "d-none");
        }
    }
}

// Home Section ----------------------------------------------------------------------
function setTimeNow() {
    let time = new Date();
    document.getElementById("fullTime").innerText = time.toLocaleTimeString().slice(0, -2);
    document.getElementById("timeAfter").innerText = time.toLocaleTimeString().slice(-2);
    document.getElementById("fullDate").innerText = "Date: " + time.toString().split(" ").slice(0, 4).join(" ") + "\n" + time.toString().split(" ").slice(6).join(" ");
}


// Chronometer Section ------------------------------------------------------------------
var chronometerInterval, chronometerTimeInStart, chronometerTimeInStop, chronometerDelay = 0;
var chronometerHour1, chronometerHour2, chronometerMinute1, chronometerMinute2, chronometerSecond1, chronometerSecond2, chronometerMillisecond1, chronometerMillisecond2, chronometerMillisecond3;
var disableAttr1 = document.createAttribute("disabled"); // For Record Button

// -------------------------------------------
function setChronometer() {
    const delta = new Date() - chronometerTimeInStart - chronometerDelay;

    const hours = String(Math.floor(delta / (60 * 60 * 1000))).padStart(2 ,"0");
    chronometerHour1 = hours.at(-2);
    chronometerHour2 = hours.at(-1);
    const minutes = String(Math.floor((delta - hours * (60 * 60 * 1000)) / (60 * 1000))).padStart(2, "0");
    chronometerMinute1 = minutes.at(-2);
    chronometerMinute2 = minutes.at(-1);
    const seconds = String(Math.floor((delta - (hours * (60 * 60 * 1000) + minutes * (60 * 1000))) / 1000)).padStart(2, "0");
    chronometerSecond1 = seconds.at(-2);
    chronometerSecond2 = seconds.at(-1);
    const milliseconds = String(delta - (hours * (60 * 60 * 1000) + minutes * (60 * 1000) + seconds * 1000)).padStart(3, "0");
    chronometerMillisecond1 = milliseconds.at(-3);
    chronometerMillisecond2 = milliseconds.at(-2);
    chronometerMillisecond3 = milliseconds.at(-1);

    document.querySelectorAll("#chronometer .hour1").item(0).innerText = chronometerHour1;
    document.querySelectorAll("#chronometer .hour2").item(0).innerText = chronometerHour2;
    document.querySelectorAll("#chronometer .minute1").item(0).innerText = chronometerMinute1;
    document.querySelectorAll("#chronometer .minute2").item(0).innerText = chronometerMinute2;
    document.querySelectorAll("#chronometer .second1").item(0).innerText = chronometerSecond1;
    document.querySelectorAll("#chronometer .second2").item(0).innerText = chronometerSecond2;
    document.querySelectorAll("#chronometer .millisecond1").item(0).innerText = chronometerMillisecond1;
    document.querySelectorAll("#chronometer .millisecond2").item(0).innerText = chronometerMillisecond2;
    document.querySelectorAll("#chronometer .millisecond3").item(0).innerText = chronometerMillisecond3;
}

// -------------------------------------------
function recordChronometer() {
    const listGroup = document.querySelectorAll("#chronometerRow4 ul").item(0);
    const item = document.createElement("li");

    item.className = "list-group-item list-group-item-light rounded mb-1 shadow";
    item.innerText = chronometerHour1 + chronometerHour2 + " : " + chronometerMinute1 + chronometerMinute2 + " : " + chronometerSecond1 + chronometerSecond2 + " / " + chronometerMillisecond1 + chronometerMillisecond2 + chronometerMillisecond3 + "ms"
    listGroup.appendChild(item)
}

// -------------------------------------------
function playChronometer() {
    if (chronometerInterval){
        // Stop
        chronometerTimeInStop = new Date();
        clearInterval(chronometerInterval);
        chronometerInterval = null;
        document.getElementById("chronometerRow3").children.item(1).innerHTML = "<i class='fas fa-play' title='Play'></i>"
    }
    else {
        let time = "";
        for (const child of document.getElementById("chronometerRow1").children) {
            time += child.innerText;
        }
        for (const child of document.getElementById("chronometerRow2").children) {
            time += child.innerText;
        }

        // Continue Or Start
        if (time === "00:00:00000"){
            clearInterval(chronometerInterval);
            chronometerDelay = 0;
            chronometerTimeInStart = new Date();
            chronometerInterval = setInterval(setChronometer, 1);
        }
        else {
            chronometerDelay += new Date() - chronometerTimeInStop;
            chronometerInterval = setInterval(setChronometer, 1);
        }
        document.getElementById("chronometerRow3").children.item(1).innerHTML = "<i class='fas fa-pause' title='Pause'></i>";
        document.getElementById("chronometerRow3").children.item(0).removeAttributeNode(disableAttr1);
    }
}

// ------------------------------------
function clearChronometer() {
    clearInterval(chronometerInterval);
    chronometerDelay = 0;
    chronometerTimeInStop = 0;
    chronometerTimeInStart = new Date();
    setChronometer();
    document.querySelectorAll("#chronometerRow4 ul").item(0).innerHTML = "";
    document.getElementById("chronometerRow3").children.item(1).innerHTML = "<i class='fas fa-play' title='Play'></i>"
    document.getElementById("chronometerRow3").children.item(0).setAttributeNode(disableAttr1);
}

// Timer Section ----------------------------------------------------------------
function inputsKeyPress(event) {
    const callerElement = event.target;
    if (/[0-9]/.test(event.key) === false && event.key !== "Tab" && event.key !== "Backspace"){
        event.preventDefault();
    }
    else if (event.key !== "Tab" && event.key !== "Backspace"){
        if (Number(callerElement.value + event.key) > Number(callerElement.max)){
            event.preventDefault();
        }
    }
}

// ------------------------------------------
function checkInputs(){
    let inputs = "";
    for (const input of document.querySelectorAll("#timerInput input")) {
        if (input.value === ""){
            return false;
        }
        else {
            inputs += input.value;
        }
    }
    if (/[0-9]/.test(inputs) === true){
        return inputs !== "000";
    }
    return false;
}

// --------------------------------
var timerHour1, timerHour2, timerMinute1, timerMinute2, timerSecond1, timerSecond2;
var timerInterval, timerAllTime, timerTimeInStart, timerTimeInStop, timerDelay = 0;
var disableAttr2 = document.createAttribute("disabled"); // For Play Button
var disableAttr3 = document.createAttribute("disabled"); // For Start Button

// -------------------------------------------
function openTimer() {
    if (checkInputs()){
        document.getElementById("timerInput").lastElementChild.setAttributeNode(disableAttr3);

        // Rotate Effects For Opening Timer
        const timerInput = document.getElementById("timerInput");
        const timer = document.getElementById("timer");
        timerInput.style.animation = "animation1 1s ease-in 1";


        setTimeout(function (){
            timerInput.className = timerInput.className.replace("d-flex", "d-none");
            timer.style.animation = "animation2 1s ease-out 1";
            timer.className = timer.className.replace("d-none", "d-flex");
        }, 1000);

        // Making Timer
        const hours = document.querySelectorAll("#timerInput input[placeholder='Hours']").item(0).value;
        const minutes = document.querySelectorAll("#timerInput input[placeholder='Minutes']").item(0).value;
        const seconds = document.querySelectorAll("#timerInput input[placeholder='Seconds']").item(0).value;

        timerAllTime = new Date(Number(hours)*(60*60*1000) + Number(minutes)*(60*1000) + (Number(seconds)+1)*1000);
        timerTimeInStart = new Date();
        document.getElementById("timerRow2").children.item(0).innerHTML = "<i class='fas fa-pause' title='Pause'></i>";
        try {document.getElementById("timerRow2").children.item(0).removeAttributeNode(disableAttr2);} catch {}
        timerInterval = setInterval(setTimer, 1000);
    }
    else {
        // Making Alert
        try {document.getElementsByClassName("alert").item(0).remove()} catch {}
        const alertDanger = document.createElement("div");
        alertDanger.className = "alert alert-dismissible alert-danger fade show position-fixed rounded-4";
        alertDanger.style.bottom = "25px";
        alertDanger.style.right = "15px";

        const heading = document.createElement("p");
        heading.innerText = "The inputs are invalid! ";
        heading.className = "alert-heading fs-4 pe-2";
        const btnClose = document.createElement("button");
        btnClose.className = "btn-close fs-5 p-0 pt-5";
        btnClose.setAttribute("data-bs-dismiss", "alert");

        alertDanger.appendChild(heading);
        alertDanger.appendChild(btnClose);
        document.getElementById("timerSection").appendChild(alertDanger);
    }
}

// --------------------------------------------
function setTimer() {
    if (timerHour1 === undefined || Number(timerHour1 + timerHour2 + timerMinute1 + timerMinute2 + timerSecond1 + timerSecond2) > 0){
        const delta = new Date() - timerTimeInStart - timerDelay;
        const nowTime = timerAllTime - delta;

        const hours = String(Math.floor( nowTime / (60 * 60 * 1000))).padStart(2 ,"0");
        timerHour1 = hours.at(-2); timerHour2 = hours.at(-1);

        const minutes = String(Math.floor((nowTime - hours * (60 * 60 * 1000)) / (60 * 1000))).padStart(2, "0");
        timerMinute1 = minutes.at(-2); timerMinute2 = minutes.at(-1);

        const seconds = String(Math.floor((nowTime - (hours * (60 * 60 * 1000) + minutes * (60 * 1000))) / 1000)).padStart(2, "0");
        timerSecond1 = seconds.at(-2); timerSecond2 = seconds.at(-1);

        document.querySelectorAll("#timer .hour1").item(0).innerText = timerHour1;
        document.querySelectorAll("#timer .hour2").item(0).innerText = timerHour2;
        document.querySelectorAll("#timer .minute1").item(0).innerText = timerMinute1;
        document.querySelectorAll("#timer .minute2").item(0).innerText = timerMinute2;
        document.querySelectorAll("#timer .second1").item(0).innerText = timerSecond1;
        document.querySelectorAll("#timer .second2").item(0).innerText = timerSecond2;
    }
    else {
        clearInterval(timerInterval);
        timerTimeInStop = 0;
        timerTimeInStart = 0;
        timerDelay = 0;
        document.getElementById("timerRow2").children.item(0).innerHTML = "<i class='fas fa-play' title='Play'></i>";
        document.getElementById("timerRow2").children.item(0).setAttributeNode(disableAttr2);
        timerHour1 = undefined; timerHour2 = undefined; timerMinute1 = undefined; timerMinute2 = undefined; timerSecond1 = undefined; timerSecond2 = undefined;

        // Making Alert
        try {document.getElementsByClassName("alert").item(0).remove()} catch {}
        const alertSuccess = document.createElement("div");
        alertSuccess.className = "alert alert-dismissible alert-success fade show position-fixed rounded-4";
        alertSuccess.style.bottom = "25px";
        alertSuccess.style.right = "15px";

        const heading = document.createElement("p");
        heading.innerText = "The Timer is over! ";
        heading.className = "alert-heading fs-4 pe-3";
        const btnClose = document.createElement("button");
        btnClose.className = "btn-close fs-5 p-0 pt-5";
        btnClose.setAttribute("data-bs-dismiss", "alert");

        alertSuccess.appendChild(heading);
        alertSuccess.appendChild(btnClose);
        document.getElementById("timerSection").appendChild(alertSuccess);
    }
}

// --------------------------------------
function playTimer() {
    if (timerInterval){
        // Stop
        clearInterval(timerInterval);
        timerTimeInStop = new Date();
        timerInterval = null;
        document.getElementById("timerRow2").children.item(0).innerHTML = "<i class='fas fa-play' title='Play'></i>"
    }
    else {
        // Continue
        timerDelay += new Date() - timerTimeInStop;
        timerTimeInStop = 0;
        timerInterval = setInterval(setTimer, 1000);
        document.getElementById("timerRow2").children.item(0).innerHTML = "<i class='fas fa-pause' title='Pause'></i>";
    }
}

// ------------------------------------------
function clearTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerTimeInStop = 0;
    timerTimeInStart = 0;
    timerDelay = 0;

    // Rotate Effects For Closing Timer
    const timer = document.getElementById("timer");
    const timerInput = document.getElementById("timerInput");
    timer.style.animation = "animation1 1s ease-in 1";

    setTimeout(function () {
        timer.className = timer.className.replace("d-flex", "d-none");
        timerInput.style.animation = "animation2 1s ease-out 1";
        timerInput.className = timerInput.className.replace("d-none", "d-flex");
    }, 1000)
    document.getElementById("timerInput").lastElementChild.removeAttributeNode(disableAttr3);
}
