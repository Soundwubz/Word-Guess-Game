var heroes = ["ironman", "hulk", "black widow", "superman", "batman"];
var gameStarted = false;
var currentHero = 0;

var numOfLetters = heroes[currentHero].length;
var lettersGuessed = 0;

var wordDisplay = document.getElementById("wordDisplay");
var subTitle = document.getElementById("subTitle");

document.addEventListener('keyup', keyLog);

function init(i) {
    numOfLetters = heroes[i].length;
    console.log(numOfLetters)
} // init properly resets numOfLetters value

function guessLetter(letter) {
    var occurance = 0;
    for(j = 0; j < numOfLetters; j++){ // possibly getting cut off
        if(heroes[currentHero].charAt(j) === letter) {
            occurance += 1;
            document.getElementById(j).textContent = letter;
        }
    }
    lettersGuessed += occurance;
    if(lettersGuessed === numOfLetters) {
        alert("You guessed " + heroes[currentHero] + " correctly!");
        wordDisplay.textContent = "";
        gameStarted = false;
        if(currentHero < heroes.length) {
            currentHero += 1;
            init(currentHero);
        }
        lettersGuessed = 0;
    }
    console.log(letter + " appears " + occurance + " times");
}

function keyLog(e) {
    function setGame() {
        for(i = 1; i <= numOfLetters; i++) {
            var emptySpace = document.createElement("div");
            emptySpace.className = "letter";
            emptySpace.id = i - 1;
            wordDisplay.appendChild(emptySpace);
        }
        if(currentHero > 0) {
            guessLetter(e.key);
        }
        subTitle.textContent = "Type a letter to guess";
    }

    if(gameStarted) {
        guessLetter(e.key);
    }
    else {
        gameStarted = true;
        console.log(gameStarted);
        setGame();
    }
}