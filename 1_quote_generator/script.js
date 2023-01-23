// Get Quotes From API
//async func 

// //empty global var would be populated fetching api, converting to json obj and putting on global var
// let apiQuotes = [];

// //Show new Quote 
// function newQuote() {
//     //Pick a random quote from apiQuotes array
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     console.log(quote);
// }

//Show new Quote storing on local script quotes.js can be handy with fallback
function newQuote() {
    //Pick a random quote from quotes.js file containing const localQuotes
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

// async function getQuotes() {
//     const apiUrl = 'https://type.fit/api/quotes';
//     // try catch allows to attempt to complete fetch req but if it doesn't work we can catch
//     //error and do something with it
//     try {
//         const response = await fetch(apiUrl);
//         //gettting json from api , and putting on global var
//         apiQuotes = await response.json();
//         // console.log(apiQuotes);
//         //created 1617 objs but we want only single obj one at a time
//         //  console.log(apiQuotes[12]); this can be a way but it wont be dynamic, we will try with math.random later

//         newQuote();

//     } catch (e) {
//         alert(e)
//         //Catch error here
//     }
// }

// //On Load
// getQuotes();

//loading from local machine
newQuote();