// Reference to elements
const img = document.getElementById("m-img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
// Global var
let isPlaying = false;

// Array music info
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "7 Nation Army",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
];

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Load songs
let iSong = 0;

function loadSong() {
  title.textContent = songs[iSong].displayName;
  artist.textContent = songs[iSong].artist;
  music.src = `music/${songs[iSong].name}.mp3`;
  img.src = `img/${songs[iSong].name}.jpg`;
  if (document.readyState === "complete") playSong();
}

// Next
nextBtn.addEventListener("click", () => {
  iSong++;
  if (iSong >= songs.length) iSong = 0;
  loadSong();
});

// Next
prevBtn.addEventListener("click", () => {
  iSong--;
  if (iSong < 0) iSong = songs.length - 1;
  loadSong();
});

// Audio event handler
function timeToStr(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time - min * 60);
  return `${min}:${sec < 10 ? `0${sec}` : sec}`;
}

function timeTracker() {
  currentTime.textContent = timeToStr(music.currentTime);
  const width = (100 * music.currentTime) / music.duration;
  progress.style.width = `${width}%`;
}

// Get duration after loaded
music.addEventListener("canplay", () => {
  duration.textContent = timeToStr(music.duration);
  timeTracker();
});

// Update current time
music.addEventListener("timeupdate", () => {
  if (isPlaying) timeTracker();
});

// Auto next
music.addEventListener('ended', () => {
  nextBtn.click();
})

// Handle Click on Progress bar
progressContainer.addEventListener('click', (event)=> {
  const percentage = event.offsetX / progressContainer.offsetWidth;
  const time = music.duration * percentage;
  console.log(event.offsetX);
  music.currentTime = time;
  timeTracker();
})


// Load
loadSong();
