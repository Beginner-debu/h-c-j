const inputBar = document.querySelector('input');
const resumeButton = document.querySelector('.fa-play');
const song = document.querySelector('audio');
console.log(inputBar);
console.log(resumeButton);
console.log(song);

song.onloadedmetadata = function rangeUpdate() {
  inputBar.max = song.duration;
  inputBar.value = song.currentTime;
  console.log(inputBar.value); 
}
resumeButton.addEventListener('click', () => {
  if(resumeButton.classList.contains('fa-pause')){
    song.pause();
    resumeButton.classList.add('fa-play');
    resumeButton.classList.remove('fa-pause');
  }
  else{
    song.play();
    resumeButton.classList.remove('fa-play');
    resumeButton.classList.add('fa-pause');
    console.log(resumeButton.classList);
  }
});

if(song.play()){
  setInterval(() => {
    inputBar.value = song.currentTime;
  },500);
}

inputBar.onchange = function () {
  song.play();
  song.currentTime = inputBar.value;
  resumeButton.classList.remove('fa-play');
    resumeButton.classList.add('fa-pause');
}
