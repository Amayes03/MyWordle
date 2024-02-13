import { getInput, getRandomWord } from './lib';

function wordle() {
  const secretWord = getRandomWord();
  const maxTries = 6;
  let tries = maxTries;

  console.log("Welcome to the Wordle Game!");
  console.log(`You have ${maxTries} tries to guess a 5-letter word.`);

  while (tries > 0) {
    const guess = getInput(`Guess (${tries} tries remaining):`).toUpperCase();

    // 1b) Vérifier si la supposition est un mot de cinq lettres
    if (guess.length !== 5) {
      console.log("Your guess should be exactly 5 letters.");
      continue;
    }

    const secretWordArray = secretWord.split('');
    const guessArray = guess.split('');

    let correctLetters: number[] = [];
    let misplacedLetters: number[] = [];

    // 3) Afficher les conseils en couleur
    secretWordArray.forEach((letter, index) => {
      if (letter === guessArray[index]) {
        correctLetters.push(index);
      } else if (secretWordArray.indexOf(guessArray[index] as string) !== -1) {
        misplacedLetters.push(index);
      }
    });

    // Afficher les conseils en couleur
    for (let i = 0; i < 5; i++) {
      if (correctLetters.includes(i)) {
        console.log(`\x1b[32mLetter at position ${i + 1} is correct\x1b[0m`);
      } else if (misplacedLetters.includes(i)) {
        console.log(`\x1b[33mLetter at position ${i + 1} is present but not at the correct position\x1b[0m`);
      }
    }

    // 2b) Gérer les entrées utilisateur
    if (guess === secretWord) {
      console.log(`Congratulations! You guessed the word: ${secretWord}`);
      break;
    } else {
      console.log(`Incorrect guess.`);
      tries--;
    }
  }

  // 2a) Boucle de jeu de base
  if (tries === 0) {
    console.log(`Sorry, you're out of tries. The secret word was: ${secretWord}`);
  }
}

wordle();
