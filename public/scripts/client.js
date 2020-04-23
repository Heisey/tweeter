/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const myEscape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = data => {
  const { name, avatars, handle } = data.user;
  const content = data.content.text;
  const { created_at } = data;

  const tweet = `
    <article class="Tweet">
      <header class="Tweet__header">
        <div class="Tweet__header--container">
          <div class="Tweet__header--icon">
            <img src=${myEscape(avatars)} />
          </div>
          <span class="Tweet__header--name">${myEscape(name)}</span>
        </div>
        <span class="Tweet__header--handle">${myEscape(handle)}</span>
      </header>
      <div class="Tweet__body">
        <p>
          ${myEscape(content)}
        </p>
      </div>
      <footer class="Tweet__footer">
        <span class="Tweet__footer--date">
          ${myEscape(created_at)} days ago
        </span>
        <div class="Tweet__footer--container">
          <span class="Tweet__footer--flag">
            <i class="far fa-flag"></i>
          </span>
          <span class="Tweet__footer--retweet">
            <i class="fas fa-retweet"></i>
          </span>
          <span class="Tweet__footer--love">
            <i class="far fa-heart"></i>
          </span>
        </div>
      </footer>
    </article>
  `
  return tweet;
}

const renderTweets = (tweets) => {
  
  let str = '';

  for (let tweet of tweets) {
    str = str + createTweetElement(tweet);
  }

  $('#Tweets').prepend(str)
  
}

const dataSuccess = function() {
  
  loadTweets()
}

const dataFailed = function(error) {
  console.log('error', error)
}

const loadTweets = function() {

  $.ajax({
    type: "GET",
    url: "/tweets",
    success: renderTweets,
    error: dataFailed
  })
}

const submitFormData = function(e) {
  e.preventDefault()
  
  const warningNode = $( this ).children().first()
  const formData = $( this ).serialize();
  
  if (formData === null || formData === '') {
    return warningNode.text('You must chirp something!')
  } else if (formData.length > 140) {
    return warningNode.text('Your chirping to much, try a little less')
  }
  
  $.ajax({
    type: "POST",
    url: '/tweets',
    data: formData,
    success: dataSuccess,
    error: dataFailed
  })
}









$(document).ready(function() {

  $("#Tweeting__form").submit(submitFormData)

  loadTweets()

})
