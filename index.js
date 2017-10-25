class Game {
  constructor(){
   
    this.phraseArr = ['puzzle'];
    this.phrase = this.phraseArr[0].split('');
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.phraseLetters = this.phrase.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    });
  }; 
  checkIfWon(letter){
      if (this.correctLetters.length == this.phraseLetters.length || this.userGuess == this.phrase) {
        $('#winner_modal').show();
      };
      if (this.phrase.includes(letter)) {
        
      };
      if (this.phrase.includes(letter) == false) {
        this.wrongLetter(letter);
      };
  };
  // NEW GAME FUNCTION NOT WORKING
  // newGame(){
  //   $('.letterbox').empty();
  //   $('#input').val('');
  // let keyClone = $('.keys_wrap').clone();
  // }
  wrongLetter(letter){ // DISPLAYS ON WIN EVENT WHICH SUCKS BUT I STILL HAD TO INCLUDE BECAUSE IT'S AWESOME
    if (this.phrase.includes(letter) == false){
    $('#dennis_modal').show();
    $('#audio').get(0).play();
    };
  };
  fullGuess(){
    let guess = $('#input').val();
    let userGuess = guess.toLowerCase();
    if (userGuess === this.phrase.join('')){
      $('#winner_modal').show(); 
      this.checkIfWon(); 
    } else {
      this.wrongLetter();
    };
  };
  guessLetter(letter){
    var indices = [];

    if (this.phrase.includes(letter)) {
      for (var i = 0; i < this.phrase.length; i++) {
        if (this.phrase[i] === letter) {
          $('#letterbox' + i).text(letter);
        };
       };
       this.correctLetters.push(letter);
    } else {
      this.incorrectLetters.push(letter);
    };
    this.checkIfWon(letter);
  };

};

$(function() {
  let keyClone = $('.keycol').clone();
  let wof = new Game();

  $('#close').on('click', function(){
    $('#modal').hide();
  });
  $('#dennis_close').on('click', function(){
    $('#dennis_modal').hide();
  });
  $('#winner_close').on('click', function(){
    $('#winner_modal').hide();
  });
  $('#loser_close').on('click', function(){
    $('#loser_modal').hide();
  });
  $('#win_yes').on('click', function(){
    $('#winner_modal').hide();
    // wof.newGame(); NOT WORKING
  });
  $('#win_no').on('click', function(){
    $('#winner_modal').hide();
  });
   $('#lose_yes').on('click', function(){
    $('#loser_modal').hide();
    // wof.newGame(); NOT WORKING
  });
  $('#lose_no').on('click', function(){
    $('#loser_modal').hide();
  });
  $('.guesskey').on('click', function(){
    $('#input').show();
    $('#submit').show();
  });
  $('#submit').on('click', function(){
    wof.fullGuess();
  });
  $('.key').on('click', function(){ //THIS COULD USE IMPROVEMENT
    let letter = $(this).data('name');
    wof.guessLetter(letter);
    $(this).html(`<div class="disabled"></div>`);
  });
});