var heroes = ["ironman", "hulk", "aquaman", "superman", "batman"];
var gameStarted = false;
var currentHero = 0;

var numOfLetters = heroes[currentHero].length;
var guessedNum = 0;
var numOfGuesses = 5;
var lettersGuessed = []; // holds all currently guessed letters

var wordDisplay = document.getElementById("wordDisplay");
var guessDisplay = document.getElementById("guessDisplay");
var guessNumDisplay = document.getElementById("guessNumDisplay");
var subTitle = document.getElementById("subTitle");

document.addEventListener('keyup', keyLog);

function init(i) { // init properly resets numOfLetters and numOfGuesses value
    numOfLetters = heroes[i].length;
    numOfGuesses = 5;
} 

function gameOver(hasLost) {
    if(hasLost) {
        var heroImg = document.getElementById(heroes[currentHero -1]);
        heroImg.style = "display: none;";
    }
    wordDisplay.textContent = "";
    guessDisplay.textContent = "";
    lettersGuessed = [];
    gameStarted = false;
    guessedNum = 0;
    numOfGuesses = 5;
    guessNumDisplay.textContent = numOfGuesses
    
}

function guessLetter(letter) {
    if(lettersGuessed.includes(letter)) {
        return false;
    }
    lettersGuessed.push(letter); // collects guessed letters
    var occurance = 0;
    for(j = 0; j < numOfLetters; j++){
        if(heroes[currentHero].charAt(j) === letter) { // if hero string contains letter
            occurance += 1;
            document.getElementById(j).textContent = letter;
        }
    }
    if(occurance < 1) { // hero doesn't contain letter
        // add letter to guessDisplay
        var guessedSpace = document.createElement("div");
        guessedSpace.className = "letter";
        guessedSpace.textContent = letter;
        guessDisplay.appendChild(guessedSpace);

        if(numOfGuesses < 1) {
            alert("Game Over! You're out of guesses!");
            gameOver(true);
        } else { // lose a guess
            numOfGuesses -= 1;
            guessNumDisplay.textContent = numOfGuesses;
        }
    }
    guessedNum += occurance;
    if(guessedNum === numOfLetters) { // if all letters have been guessed
        setTimeout(function() {
            if(currentHero > 0) {
                var prevImg = document.getElementById(heroes[currentHero - 1]);
                prevImg.style = "display: none;";
            }
            var heroImg = document.getElementById(heroes[currentHero]);
            heroImg.style = "display: block;";
            alert("You guessed " + heroes[currentHero] + " correctly!");
            gameOver(false); 
            if(currentHero < heroes.length - 1) { 
                currentHero += 1;
                init(currentHero); // continue to next hero
            } else {
                alert("You Win!");
                currentHero = 0;
            }
        }, 500);
    }
}

function keyLog(e) {
    if (e.which <= 90 && e.which >= 65){
        function setGame() { // sets game for new hero
            document.getElementById(heroes[heroes.length - 1]).style = "display: none";
            init(currentHero);
            for(i = 1; i <= numOfLetters; i++) {
                var emptySpace = document.createElement("div");
                var para = document.createElement("p");

                emptySpace.className = "letterContainer";

                // fix letter spacing issue here
                // create div with letterContainer class; append paragraph

                para.id = i - 1;
                wordDisplay.appendChild(emptySpace);
                emptySpace.appendChild(para)
                guessNumDisplay.textContent = numOfGuesses;
            }
            guessLetter(e.key);
        }
        
        if(gameStarted) {
                guessLetter(e.key);
        }
        else {
            gameStarted = true;
            setGame();
        }
    }
}