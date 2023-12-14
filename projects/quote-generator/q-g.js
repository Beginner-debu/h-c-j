const blockquoteElement = document.querySelector('blockquote');
console.log(blockquoteElement);
const spanElement = document.querySelector('span');
console.log(spanElement);
const newQuoteButton = document.querySelector('.js-new-quote-button');
const tweetButton = document.querySelector('.js-tweet-button');

getQuotes();

newQuoteButton.addEventListener('click', () => {
getQuotes();
});

async function getQuotes(){
  const data = await fetch('https://api.quotable.io/quotes/random');
  const quote = await data.json();
  displayQuote(quote);


  tweetButton.addEventListener('click', () => {
    openTwitter(quote);
  });
 
}

function displayQuote(quote){
  blockquoteElement.innerHTML = `"${quote[0].content}"`;
  console.log(quote);
  spanElement.textContent = `${quote[0].author}`;
}

function openTwitter(quote){
  window.open('https://twitter.com/intent/tweet?text=' + quote[0].content + '--by' + quote[0].author);
}



