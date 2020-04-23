

// ????????????????????????? Client Side ??????????????????????????

const dateDiffer = date => {
  const day = 24 * 60 * 60 * 1000;
  return Math.floor(Math.abs((Date.now() - date) / day))
}

// ~~ DOM READY
$(document).ready(function() {

  // ~~ Event Handlers
  // ~~ Form Submit
  $("#Tweeting__form").submit(submitFormData)

  // ~~ Form Toggle
  $("#Nav__button").click(toggleForm)

  // ~~ Dom Events
  // ~~ Load Tweets
  loadTweets()
})

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

  const date = dateDiffer(created_at)

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
          ${myEscape(date)} days ago
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

  // ## Make a get request to DB
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: renderTweets,
    error: dataFailed
  })
}

// ~~ Submit Tweet Data
const submitFormData = function(e) {

  // ~~ Stop Reload
  e.preventDefault()
  
  // ~~ Warning Element
  const warningNode = $( this ).children().first()

  // ~~ Form Data
  const formData = $( this ).serialize();

  // ~~ Clear and Hide Warning Element
  warningNode.text('')
  warningNode.hide();
  
  // !! Check for empty str
  if (formData === null || formData.split('text=')[1] === '') {

    // ~~ Set Warning Element text
    warningNode.text('You must chirp something!')

    // ~~ Show Warning Element
    return warningNode.slideDown()

  // !! Check character length
  } else if (formData.length > 140) {

    // ~~ Set Warning Element text
    warningNode.text('Your chirping to much, try a little less')

    // ~~ Show Warning Node
    return warningNode.slideDown()
  }
  
  // ~~ Clear Tweets from DOM
  $(this).parent().parent().children().last().empty()

  // ~~ Clear Form input
  $(this)[0].reset()
  
  // ## Add Tweet to DB
  $.ajax({
    type: "POST",
    url: '/tweets',
    data: formData,
    success: dataSuccess,
    error: dataFailed
  })
}

// ~~ Toggle Tweet Form
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