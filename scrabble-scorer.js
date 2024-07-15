// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += parseInt(pointValue);
		 }
 
	  }
	}
	return letterPoints;
 }

 function simpleScorer (word) {
  word = word.toUpperCase();
  //let score = 0;
  //for (i = 0; i < word.length; i++){
    //score += 1;
  //}
  return word.length;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let enterWord = "";

function initialPrompt() {
enterWord = input.question("Let's play some scrabble! Enter a word: ");
return enterWord;
}

let newPointStructure = {
    'a':1, 'b':3, 'c':3, 'd':2, 
  'e':1,
    'f':4, 'g':2, 'h':4, 'i':1, 
  'j':8,
    'k':5, 'l':1, 'm':3, 'n':1, 
  'o':1,
    'p':3, 'q':10, 'r':1, 's':1, 
  't':1,
    'u':1, 'v':4, 'w':4, 'x':8, 'y':4,
  'z':10
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  let score = 0;
  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i])) {
      score +=3;
    } else {
      score += 1;
    }
  }
 return score;
}

let scrabbleScorer;

const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoreFunction: simpleScorer
  },
  {
    name: 'Bonus Vowles',
    description: 'Vowles are 3 points, consonants are 1 point.',
    scoreFunction: vowelBonusScorer
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm',
    scoreFunction: oldScrabbleScorer
  }
]
function scorerPrompt() {
console.log("Select a scoring algorithm: ");
console.log("0 - Simple Scorer: 1 point per character.");
console.log("1 - Vowel Bonus: Vowles are worth 3 points");
console.log("2 - Scrabble: Uses scrabble point system");
let choice = input.question("Enter 0, 1, or 2: ");
switch (choice) {
  case '0': 
  return scoringAlgorithms[0];
  case '1': 
  return scoringAlgorithms[1];
  case '2':
    return scoringAlgorithms[2];
    default: console.log("Invalid choice. Defaulting to Simple Scorer.");
    return scoringAlgorithms[0];
}
}

function transform() {};

function runProgram() {
  let word = initialPrompt();
  let selectedAlgorithm = scorerPrompt();
  let score = selectedAlgorithm.scoreFunction(word);
  console.log(`Score for '${word}': ${score}`);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
