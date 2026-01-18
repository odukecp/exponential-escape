console.log("... \"script.js\"");

let started = false;
let currentTask = 0;
let group = 8
group = uuidToGroup[getIdFromURL()];

function init() {
    if (group < 7) {
        console.log(`Loading content for group ${group}...`);

        const tasksContainer = document.getElementById("tasks-container");

        const header = document.createElement("h2");
        header.className = "header";
        header.innerHTML = `Gruppe ${group}`;

        const startButton = document.createElement("button");
        startButton.textContent = "Loslegen";
        startButton.onclick = start;
        header.appendChild(document.createElement("br"))
        header.appendChild(startButton);
        tasksContainer.appendChild(header);

        tasks[group].forEach((task, index) => {
            taskNumber = index + 1;

            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.id = `task${taskNumber}`;

            const question = document.createElement("p");
            question.id = `question${taskNumber}`;

            const form = document.createElement("form");
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                checkAnswer();
            });

            const input = document.createElement("input");
            input.type = "text";
            input.id = `input${taskNumber}`;
            input.tabIndex = taskNumber;

            const button = document.createElement("button");
            button.id = `button${taskNumber}`;
            button.textContent = "Überprüfen";

            form.appendChild(input);
            form.appendChild(button);

            taskDiv.appendChild(question);
            taskDiv.appendChild(form);

            tasksContainer.appendChild(taskDiv)
        });
    } else {
        console.log("Loading admin-content");

        const allTasksDiv = document.getElementById("tasks-container");

        const header = document.createElement("h2");
        header.textContent = "Alle Aufgaben (Admin)";
        header.className = "header";
        allTasksDiv.appendChild(header);

        for (let i = 1; i <= 6; i++) {
            const oneGroupDiv = document.createElement("div");
            oneGroupDiv.className = "task-admin"
            const title = document.createElement("h2");
            title.textContent = `Gruppe ${i}`;
            oneGroupDiv.appendChild(title);

            tasks[i].forEach((task, index) => {
                let taskNumber = index + 1;
                question = tasks[i][index].question;
                answer = tasks[i][index].answer;

                const qa = document.createElement("div");

                const q = document.createElement("p");
                q.textContent = `- Frage ${taskNumber}: ${question}`;

                const a = document.createElement("p");
                a.textContent = `- Antwort ${taskNumber}: ${answer}`;

                qa.appendChild(q);
                qa.appendChild(a);
                qa.appendChild(document.createElement("br"))
                oneGroupDiv.appendChild(qa)
            })
            allTasksDiv.appendChild(oneGroupDiv)
        }
    };
    const footer = document.getElementById("footer");
    const groupNumber = document.createElement("h1");
    groupNumber.textContent = `${group}`;
    footer.appendChild(groupNumber)
}

function start() {
    if (!started) {
        started = true;
        showTask(currentTask)
    }
};

function showTask(currentTask) {
    let taskQuestion = tasks[group][currentTask].question;
    console.log(`Asking for Question ${currentTask+1}: ${taskQuestion}`);
    document.getElementById(`task${currentTask+1}`).style.display = "block";
    document.getElementById(`question${currentTask+1}`).innerHTML = taskQuestion;
    MathJax.typeset();
    document.getElementById(`input${currentTask + 1}`).focus()
};

function checkAnswer() {
    let taskAnswer = tasks[group][currentTask].answer;
    let taskResult = tasks[group][currentTask].result;
    let raw = document.getElementById(`input${currentTask+1}`).value;
    let prc = false;
    if (raw.trim().endsWith("%")){prc = true};
    let input = parseFloat(raw.replace(",", "."));
    if (prc){len = String(input).length; input /= 100; input = parseFloat(input.toFixed(len))};
    if (taskAnswer === input) {
        console.log(currentTask)
        document.getElementById(`button${currentTask+1}`).style.display = "none";
        console.log("right");
        currentTask = currentTask + 1;
        alert(taskResult);
        if (currentTask < tasks[group].length) {
            showTask(currentTask)
        } else {
            alert("Geschafft, jetzt müsst ihr nur noch herausfinden, welches Schloss ihr mit eurem Code öffnen könnt.")
        }
    } else {
        alert("Falsch, versuche es noch einmal!")
        console.log(input)
    }
};

function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

function getIdFromURL() {
  const parts = window.location.pathname
    .split("/")
    .filter(Boolean);
  return parts.at(-1) ?? null;
};

init()