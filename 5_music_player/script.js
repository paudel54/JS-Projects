// use of querySelector to select anythings like element, id, classes
// here we are targeting to select audio element with query selector
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Check if playing 
let isPlaying = false;


//Play
function playSong() {
    isPlaying = true;
    // .play() and pause() are methods DOM methods
    playBtn.classList.replace('fa-play', 'fa-pause');
    // toggles the title of icon form title to Pause
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or Pause Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

