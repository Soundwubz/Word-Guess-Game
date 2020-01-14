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
    console.log(numOfLetters);
} 

function gameOver() {
    wordDisplay.textContent = "";
    guessDisplay.textContent = "";
    lettersGuessed = [];
    gameStarted = false;
    guessedNum = 0;
    numOfGuesses = 5;
    guessNumDisplay.textContent = numOfGuesses
}

function guessLetter(letter) {
    lettersGuessed.push(letter); // collects guessed letters
    //console.log(lettersGuessed);
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
            gameOver();
        } else { // lose a guess
            numOfGuesses -= 1;
            guessNumDisplay.textContent = numOfGuesses;
        }
    }
    guessedNum += occurance;
    if(guessedNum === numOfLetters) { // if all letters have been guessed
        setTimeout(function() {
            alert("You guessed " + heroes[currentHero] + " correctly!");
            console.log('hero' + currentHero);
            console.log(heroes.length);
            gameOver(); 
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
            for(i = 1; i <= numOfLetters; i++) {
                var emptySpace = document.createElement("div");
                emptySpace.className = "letter";
                emptySpace.id = i - 1;
                wordDisplay.appendChild(emptySpace);
                guessNumDisplay.textContent = numOfGuesses;
            }
            guessLetter(e.key);
        }
        
        if(gameStarted) {
                guessLetter(e.key);
            }
        }
        else {
            gameStarted = true;
            setGame();
        }
    }
}