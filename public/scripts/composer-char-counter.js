$(document).ready(function() {

  const tweetingFormText = $('#Tweeting__form--text');
  const tweetingFormCounter = $('#Tweeting__form--counter');

  

  tweetingFormText.on('input', e => {
    
    const inputLength = e.target.value.length;

    if (inputLength > 140) {
      tweetingFormCounter["0"].style.color = "red"
    } else {
      tweetingFormCounter["0"].style.color = "white"
    }

    tweetingFormCounter["0"].innerText = 140 - inputLength;
  })

})