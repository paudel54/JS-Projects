const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes From API
// async func 

//empty global var would be populated fetching api, converting to json obj and putting on global var
let apiQuotes = [];

//Show loading
function loading() {
    //when loader is going we want only loader be seen nothing else
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//HIde loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show new Quote 
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);

    //check if author field is balnk and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorext.textContent = quote.author;
    }
    //check quote length to determine styling, JS selects class to style. 
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set Quote , Hide Loader
    //adding text from quote api object
    quoteText.textContent = quote.text;
    complete();
}


//get quote from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    // try catch allows to attempt to complete fetch req but if it doesn't work we can catch
    //error and do something with it
    try {
        const response = await fetch(apiUrl);
        //gettting  in json format from api , and putting on global var
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        //created 1617 objs but we want only single obj one at a time
        //  console.log(apiQuotes[12]); this can be a way but it wont be dynamic, we will try with math.random later

        newQuote();

    } catch (e) {
        alert(e)
        //Catch error here
    }
}



//loading from local machine

//Show new Quote storing on local script quotes.js can be handy with fallback
// function newQuote() {
//     //Pick a random quote from quotes.js file containing const localQuotes
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// newQuote();


//Tweet quote
function tweetQuote() {
    //here ? => query , backtick `` is used because we can pass varibale onto it. 
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
//making the button functional
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
