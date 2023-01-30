const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// use of querySelector to select anythings like element, id, classes
// here we are targeting to select audio !! element with query selector
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music playlist load
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'The Instrumental',
        artist: 'David Henry',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven National Army (Remix)',
        artist: 'Robot Philips',
    },
    {
        name: 'jacinto-3',
        displayName: 'Sky Above the Cloud',
        artist: 'Steve Carlos',
    },
    {
        name: 'metric-1',
        displayName: 'The metric',
        artist: 'William Santo',
    },
];


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

// Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `Music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    console.log(songIndex);
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song
function nextSong() {
    console.log(songIndex);
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ON Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);