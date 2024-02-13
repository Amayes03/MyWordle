"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
function wordle() {
    var secretWord = (0, lib_1.getRandomWord)();
    var maxTries = 6;
    var tries = maxTries;
    console.log("Welcome to the Wordle Game!");
    console.log("You have ".concat(maxTries, " tries to guess a 5-letter word."));
    var _loop_1 = function () {
        var guess = (0, lib_1.getInput)("Guess (".concat(tries, " tries remaining):")).toUpperCase();
        // 1b) Vérifier si la supposition est un mot de cinq lettres
        if (guess.length !== 5) {
            console.log("Your guess should be exactly 5 letters.");
            return "continue";
        }
        var secretWordArray = secretWord.split('');
        var guessArray = guess.split('');
        var correctLetters = [];
        var misplacedLetters = [];
        // 3) Afficher les conseils en couleur
        secretWordArray.forEach(function (letter, index) {
            if (letter === guessArray[index]) {
                correctLetters.push(index);
            }
            else if (secretWordArray.indexOf(guessArray[index]) !== -1) {
                misplacedLetters.push(index);
            }
        });
        // Afficher les conseils en couleur
        for (var i = 0; i < 5; i++) {
            if (correctLetters.includes(i)) {
                console.log("\u001B[32mLetter at position ".concat(i + 1, " is correct\u001B[0m"));
            }
            else if (misplacedLetters.includes(i)) {
                console.log("\u001B[33mLetter at position ".concat(i + 1, " is present but not at the correct position\u001B[0m"));
            }
        }
        // 2b) Gérer les entrées utilisateur
        if (guess === secretWord) {
            console.log("Congratulations! You guessed the word: ".concat(secretWord));
            return "break";
        }
        else {
            console.log("Incorrect guess.");
            tries--;
        }
    };
    while (tries > 0) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    // 2a) Boucle de jeu de base
    if (tries === 0) {
        console.log("Sorry, you're out of tries. The secret word was: ".concat(secretWord));
    }
}
wordle();
