// ~~ Escape text function
const myEscape =  function(str) {

  // ~~ Create temp div
  let div = document.createElement('div');

  // ~~ insert text into div
  div.appendChild(document.createTextNode(str));

  // ~~ return text node from div
  return div.innerHTML;
}


// ~~ Create Tweet Template
const createTweetElement = data => {

  // ~~ Get variables from data
  const { name, avatars, handle } = data.user;
  const content = data.content.text;
  const { created_at } = data;

  // ~~ Insert variables into template 
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

  // ~~ Return template
  return tweet;
}

// ~~ Render Tweets to DOM
const renderTweets = (tweets) => {

  // ~~ Reverse data
  tweets.reverse()

  // ~~ start empty template str
  let str = '';

  // ~~ Loop through data creating add templates to str
  for (let tweet of tweets) {
    str = str + createTweetElement(tweet);
  }

  // ~~ Append tweets to DOM
  $('#Tweets').append(str)
}

// ~~ Data Success Callback
const dataSuccess = function() {
  
  // ~~ Load Tweets
  loadTweets()
}

// ~~ Data Failed Callback
const dataFailed = function(error) {

  // !! Log Error to console
  console.log('error', error)
}

// ~~ Load Tweets to DOM
const loadTweets = function() {

  // ~~ Make a get request to DB
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
  $(this)[0].reset()

  warningNode.text('')
  warningNode.hide();
  
  if (formData === null || formData.split('text=')[1] === '') {
    warningNode.text('You must chirp something!')
    return warningNode.slideDown()
  } else if (formData.length > 140) {
    return warningNode.text('Your chirping to much, try a little less')
  }
  $(this).parent().parent().children().last().empty()
  
  $.ajax({
    type: "POST",
    url: '/tweets',
    data: formData,
    success: dataSuccess,
    error: dataFailed
  })
}


const toggleForm = function(e) {
  $(this)
    .parent()
    .parent()
    .siblings()
    .first()
    .children()
    .last()
    .children()
    .first()
    .slideToggle('slow')
}






$(document).ready(function() {

  $("#Tweeting__form").submit(submitFormData)

  $("#Nav__button").click(toggleForm)

  loadTweets()

})
