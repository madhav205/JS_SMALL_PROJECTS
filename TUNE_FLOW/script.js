let songs = [];
let currentPlaying = -1;

const songName = document.getElementById("songName");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");

const addBtn = document.getElementById("addBtn");

const songList = document.getElementById("songList");

const totalSongs = document.getElementById("totalSongs");
const queueTime = document.getElementById("queueTime");
const favSongs = document.getElementById("favSongs");
const playingSong = document.getElementById("playingSong");
const queueBadge = document.getElementById("queueBadge");

const searchBox = document.getElementById("searchBox");

const audioPlayer = document.getElementById("audioPlayer");

// =====================
// Add Song
// =====================

addBtn.addEventListener("click", addSong);

function addSong() {

    const title = songName.value.trim();
    const singer = artist.value.trim();
    const time = duration.value.trim();

    if (title === "" || singer === "" || time === "") {
        alert("Please fill all fields");
        return;
    }

    songs.push({
        title: title,
        artist: singer,
        duration: time,
        favourite: false,
        src: "amrinder.mp3"
    });

    clearInputs();

    displaySongs();

}

// =====================
// Clear Inputs
// =====================

function clearInputs() {

    songName.value = "";
    artist.value = "";
    duration.value = "";

}

// =====================
// Display Songs
// =====================

function displaySongs() {

    songList.innerHTML = "";

    if (songs.length === 0) {

        songList.innerHTML = `

        <div class="empty text-center p-5">

            <h3>No Songs Added</h3>
            <p>Add Songs to Queue</p>

        </div>

        `;

        updateStats();

        return;
    }

    songs.forEach((song, index) => {

        songList.innerHTML += `

<div class="song d-flex justify-content-between align-items-center p-3 border rounded mb-3 ${currentPlaying==index?"playing":""}">

<div>

<h5>${song.title}</h5>

<p>${song.artist}</p>

<small>${song.duration}</small>

</div>

<div class="d-flex gap-2">

<button class="btn btn-success btn-sm"
onclick="playSong(${index})">

<i class="bi bi-play-fill"></i>

</button>

<button
class="btn btn-sm ${song.favourite?"btn-danger":"btn-outline-danger"}"
onclick="toggleFavourite(${index})">

<i class="bi bi-heart-fill"></i>

</button>

<button
class="btn btn-dark btn-sm"
onclick="deleteSong(${index})">

<i class="bi bi-trash-fill"></i>

</button>

</div>

</div>

`;

    });

    updateStats();

}

// =====================
// Delete Song
// =====================

function deleteSong(index){

    songs.splice(index,1);

    if(currentPlaying==index){

        currentPlaying=-1;

        playingSong.innerText="None";

        audioPlayer.pause();

    }

    displaySongs();

}

// =====================
// Update Stats
// =====================

function updateStats(){

    totalSongs.innerText=songs.length;

    queueBadge.innerText=songs.length+" Songs";

    let minutes=0;
    let favouriteCount=0;

    songs.forEach(song=>{

        let arr=song.duration.split(":");

        minutes+=parseInt(arr[0]);

        if(song.favourite){

            favouriteCount++;

        }

    });

    queueTime.innerText=minutes+" min";

    favSongs.innerText=favouriteCount;

}

// =====================
// Search
// =====================

searchBox.addEventListener("keyup",searchSong);

function searchSong(){

    let value=searchBox.value.toLowerCase();

    let cards=document.querySelectorAll(".song");

    cards.forEach(card=>{

        if(card.innerText.toLowerCase().includes(value)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

}

displaySongs();

// =====================================
// TuneFlow Music Queue - Part 2
// =====================================

// =====================
// Play Song
// =====================

function playSong(index){

    currentPlaying = index;

    playingSong.innerText = songs[index].title;

    audioPlayer.src = songs[index].src;

    audioPlayer.play();

    displaySongs();

}

// =====================
// Favourite
// =====================

function toggleFavourite(index){

    songs[index].favourite = !songs[index].favourite;

    displaySongs();

}

// =====================
// Play Next
// =====================

const playNextBtn = document.getElementById("playNextBtn");

playNextBtn.addEventListener("click", playNext);

function playNext(){

    if(songs.length===0){

        alert("Queue is Empty");

        return;

    }

    if(currentPlaying===-1){

        currentPlaying=0;

    }

    else{

        currentPlaying++;

        if(currentPlaying>=songs.length){

            currentPlaying=0;

        }

    }

    playSong(currentPlaying);

}

// =====================
// Clear Queue
// =====================

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", clearQueue);

function clearQueue(){

    if(!confirm("Clear Complete Queue?")){

        return;

    }

    songs=[];

    currentPlaying=-1;

    audioPlayer.pause();

    audioPlayer.src="";

    playingSong.innerText="None";

    displaySongs();

}

// =====================
// Auto Next Song
// =====================

audioPlayer.addEventListener("ended",function(){

    if(songs.length>0){

        playNext();

    }

});

// =====================
// Enter Key Support
// =====================

duration.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addSong();

    }

});

// =====================================
// TuneFlow Music Queue - Part 3
// =====================================

// =====================
// Save Data
// =====================

function saveData(){

    localStorage.setItem("songs", JSON.stringify(songs));
    localStorage.setItem("currentPlaying", currentPlaying);

}

// =====================
// Load Data
// =====================

function loadData(){

    const savedSongs = localStorage.getItem("songs");

    if(savedSongs){

        songs = JSON.parse(savedSongs);

    }

    const savedPlaying = localStorage.getItem("currentPlaying");

    if(savedPlaying !== null){

        currentPlaying = parseInt(savedPlaying);

    }

    if(currentPlaying >= 0 && songs.length > 0){

        playingSong.innerText = songs[currentPlaying].title;

    }

}

// =====================
// Auto Save
// =====================

const oldDisplay = displaySongs;

displaySongs = function(){

    oldDisplay();

    saveData();

}

// =====================
// Dark Mode
// =====================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML='<i class="bi bi-sun-fill"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML='<i class="bi bi-moon-fill"></i>';

    }

});

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML='<i class="bi bi-sun-fill"></i>';

}

// =====================
// Toast
// =====================

const toastElement = document.getElementById("toast");

if(toastElement){

    const toast = new bootstrap.Toast(toastElement);

    const oldAddSong = addSong;

    addSong = function(){

        oldAddSong();

        saveData();

        toast.show();

    }

}

// =====================
// Demo Song
// =====================

loadData();

if(songs.length===0){

    songs.push({

        title:"Dildarian",

        artist:"Amrinder Gill",

        duration:"4:12",

        favourite:false,

        src:"amrinder.mp3"

    });

    saveData();

}
// =====================
// Initial Load
// =====================

displaySongs();

console.log("TuneFlow Loaded Successfully 🚀");