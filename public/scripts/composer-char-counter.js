$(document).ready(function() {

  const tweetingFormText = $('#Tweeting__form--text');
  
  tweetingFormText.on('input', e => {
    
    const inputLength = e.target.value.length;
    const counter = tweetingFormText.siblings().last().children().last();

    if (inputLength > 140) {
          counter.css("color", "red")
    } else {
          counter.css("color", "#684541")
    }

    counter.text(140 - inputLength)
  })

})