class Game {
  constructor() {
   
    this.phraseArray = [
    {phrase: 'puzzle', clue: 'Fun and Games!'},
    {phrase: 'batman', clue: 'The Dark Knight'},
    {phrase: 'bigger', clue: 'Is Always Better'},
    ];
    this.round = 0;
    this.phraseArr = this.phraseArray[this.round];
    this.phrase = this.phraseArr.phrase.split('');
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.phraseLetters = this.phrase.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    });
  };
  checkIfWon(letter) {
      if (this.correctLetters.length == this.phraseLetters.length || this.userGuess == this.phrase) {
        $('#winner_modal').show();
        this.round += 1;
        this.newGame();
      };
      if (this.phrase.includes(letter)) {
        this.guessLetter();
      };
  };
  newGame() {
    this.phraseArr = this.phraseArray[this.round];
    this.phrase = this.phraseArr.phrase.split('');
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.phraseLetters = this.phrase.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    });
    $('.letterbox').empty();
    $('#input').val('');
    $('#cluebox').text(this.phraseArr.clue);
    this.guessLetter();
  };
  wrongLetter() {
    $('#dennis_modal').show();
    $('#audio').get(0).play();
  };
  fullGuess() {
    let guess = $('#input').val();
    let userGuess = guess.toLowerCase();
    if (userGuess === this.phrase.join('')) {
      $('#winner_modal').show();
      this.round += 1;
      this.newGame();
    } else {
      this.wrongLetter();
    };
  };
  guessLetter(letter) {
    var indices = [];

    if (this.phrase.includes(letter)) {
      for (var i = 0; i < this.phrase.length; i++) {
        if (this.phrase[i] === letter) {
          $('#letterbox' + i).text(letter);
        };
       };
       this.correctLetters.push(letter);
    } else if (this.phrase[i] !== letter) {
      this.wrongLetter();
      this.incorrectLetters.push(letter);
    };
    this.checkIfWon(letter);
  };

};

$(function() {
  let keyClone = $('.keycol').clone();
  let wof = new Game();

  wof.newGame();

  $('#close').on('click', function() {
    $('#modal').hide();
  });
  $('#dennis_close').on('click', function() {
    $('#dennis_modal').hide();
  });
  $('#winner_close').on('click', function() {
    $('#winner_modal').hide(); 
  });
  $('#loser_close').on('click', function() {
    $('#loser_modal').hide();
  });
  $('#win_yes').on('click', function() {
    $('#winner_modal').hide();
    wof.newGame();
  });
  $('#win_no').on('click', function() {
    $('#winner_modal').hide();
  });
   $('#lose_yes').on('click', function() {
    $('#loser_modal').hide();
    wof.newGame();
  });
  $('#lose_no').on('click', function() {
    $('#loser_modal').hide();
  });
  $('.guesskey').on('click', function() {
    $('#input').show();
    $('#submit').show();
  });
  $('#submit').on('click', function() {
    wof.fullGuess();
  });
  $('.key').on('click', function() {
    let letter = $(this).data('name');
    wof.guessLetter(letter);
  });
});