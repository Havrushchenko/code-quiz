// Declared global variables
var highScore = document.getElementById("highscore");
var clear = document.getElementById("clear");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retreives local storage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + "-" + allScores[i].score + " points";
        highScore.appendChild(createLi);
    }
};