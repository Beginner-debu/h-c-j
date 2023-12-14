const stopButton = document.getElementById('stop');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const headingElement = document.querySelector('div h1');


let [seconds,minutes,hours] = [0,0,0];
let timer = null;
function countTime(){
  h = hours<10?'0' + hours:hours;
  m = minutes<10?'0' + minutes:minutes;
  s = seconds<10?'0' + seconds:seconds;
  seconds++;
  if(seconds === 60){
    seconds = 0;
    minutes++;
  }
  if(minutes === 60){
    minutes = 0;
    hours++;
  }
  if(hours === 24){
    hours = 0;
  }
  headingElement.innerHTML = `${h}:${m}:${s}`;
}


resumeButton.addEventListener('click', () => {
  if(timer !== null){
    clearInterval(timer);
  }
  timer = setInterval(countTime,1000);
});

resetButton.addEventListener('click', () => {
seconds=0;
minutes=0;
hours=0;
headingElement.innerHTML = '00:00:00';
clearInterval(timer);
});

stopButton.addEventListener('click', () => {
clearInterval(timer);

});