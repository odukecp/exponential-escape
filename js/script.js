console.log("script.js is running!");

let started = false;
let currentTask = 0;


function start() {
    if (!started) {
        started = true;;
        showTask(currentTask);
    }
}

function showTask(currentTask) {
    let taskQuestion = tasks[currentTask].question;
    console.log(`Asking for Question ${currentTask+1}: ${taskQuestion}`);
    document.getElementById(`task${currentTask+1}`).style.display = "block"
    document.getElementById(`question${currentTask+1}`).innerHTML = taskQuestion;
    MathJax.typeset()
}

function checkAnswer() {
    let taskAnswer = tasks[currentTask].answer;
    let input = parseFloat(document.getElementById(`input${currentTask+1}`).value)
    if (taskAnswer === input) {
        console.log("right")
        currentTask = currentTask + 1;
        if (currentTask < tasks.length) {
            showTask(currentTask)
        } else {
            alert("Du hast es geschafft! Herzlichen Glückwunsch!")
        }
    } else {
        alert("Falsch, versuche es noch einmal!")
    }
}