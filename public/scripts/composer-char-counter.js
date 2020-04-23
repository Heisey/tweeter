// ~~ DOM READY
$(document).ready(function() {

  // ~~ Grab form textarea element
  const tweetingFormText = $('#Tweeting__form--text');
  
  // ~~ Input Event listener
  tweetingFormText.on('input', e => {
    
    // ~~ Get input length
    const inputLength = e.target.value.length;

    // ~~ Traverse to character counter text
    const counter = tweetingFormText.siblings().last().children().last();

    // !! If Input over 140
    if (inputLength > 140) {

      // ~~ Change counter text to red
      counter.css("color", "red")
    } else {
      // ~~ Change counter text to template color
      counter.css("color", "#684541")
    }

    // ~~ Change counter text
    counter.text(140 - inputLength)
  })

})