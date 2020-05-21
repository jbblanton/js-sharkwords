const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  const letters = Array.from(word);

  for (const char of letters) {
    $('#word-container').append(`<div class="letter-box ${char}"></div>`);
  }

};


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = (string=ALPHABET) => {
  const letters = Array.from(string)

  for (const char of letters) {
    $('#letter-buttons').append(`<button>${char}</button>`);
  }
};


// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  const button = $(buttonEl);

  button.attr('disabled', true);
};


// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {

  return $(`div.${letter}`)[0] !== undefined;
};


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const yesGuess = $(`div.${letter}`)

  for (const idx in yesGuess) {
    if ($(`div.${letter}`)[idx] !== undefined); {
      $(`.${letter}`).html(letter);
    }
  }
};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  if (numWrong < 5) {
    numWrong += 1;
    $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);
  } else {
    $('button').attr('disabled', true);
    $('a').show();
  }
};


// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  $('#letter-buttons').empty();
  $('#word-container').empty();
  $('a').hide();
  numWrong = 0;
  $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);

};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  
  const word = WORDS[Math.floor(Math.random()*WORDS.length)]


  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
