// Questions array
const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very usefol tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Declared global variables
var time = document.querySelector("#time");
var startQuizButton = document.querySelector("#startQuizButton");
var container = document.querySelector("#container");
var wrapper = document.querySelector("#wrapper");
var olCreate = document.createElement("ol");
var score = 0;
var questionIndex = 0;
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;

// Countdown function 
startQuizButton.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to the page: 
function render(questionIndex) {

    // Clear data in index.html
    container.innerHTML = "";
    olCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {

        // Appends question title
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        container.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        container.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Compare choices with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {

            // -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    container.appendChild(createDiv);

}

// All done will append last page
function allDone() {

    // Clear data in index.html
    container.innerHTML = "";
    time.innerHTML = "";

    // Create new header
    var createH1 = document.createElement("h1");
    createH1.textContent = "All Done!"
    container.appendChild(createH1);

    // Create new paragraph
    var createP = document.createElement("p");
    createP.setAttribute("style", "margin-left:0");
    container.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var startQuizButtonemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + startQuizButtonemaining;
        container.appendChild(createP2);
    }
    // Create label
    var createLabel = document.createElement("label");
    createLabel.textContent = "Enter your initials: ";
    container.appendChild(createLabel);

    // Create input form
    var createInput = document.createElement("input");
    createInput.textContent = "";
    container.appendChild(createInput);
    var createSubmit = document.createElement("button");

    // Create submit
    createSubmit.textContent = "Submit";
    container.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (!initials) {
            return (createSubmit);
        } else {
            var finalScore = {
                initials: initials,
                score: startQuizButtonemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (!allScores) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // Swich to final page
            window.location.replace("./highscores.html");
        }
    });
}









