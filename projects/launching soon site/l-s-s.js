const days = document.querySelector('.days-container h1');
const hours = document.querySelector('.hours-container h1');
const minutes = document.querySelector('.minutes-container h1');
const seconds = document.querySelector('.seconds-container h1');

//console.log(days);
//console.log(hours);
//console.log(minutes);
//console.log(seconds);




function calculateTime(){
    const launchTime = new Date(2024,0,2,17,10,10);
    const todayDate = new Date();


    const launchTimeInMs = launchTime.getTime();
    const todayTimeInMs = todayDate.getTime();
    const remainingTime = launchTimeInMs - todayTimeInMs;

    if(remainingTime > 0){
      let remainingDs = Math.floor(remainingTime/(86400*1000));
      let remainingHrs = Math.floor(remainingTime%(86400*1000)/(60*60*1000));
      let remainingMin = Math.floor(remainingTime%(3600*1000)/(60*1000));
      let remainingSec = Math.floor(remainingTime%(60000)/(1000));

      let remainingSeconds = (remainingSec<10)?'0'+remainingSec:remainingSec;
      let remainingMinutes = (remainingMin<10)?'0'+remainingMin:remainingMin;
      let remainingHours = (remainingHrs<10)?'0'+remainingHrs:remainingHrs;
      let remainingDays = (remainingDs<10)?'0'+remainingDs:remainingDs;
        seconds.textContent = remainingSeconds;
        days.textContent = remainingDays;
        hours.textContent = remainingHours;
        minutes.textContent = remainingMinutes;
    }
    else{
      document.querySelector('.time-container')
        .innerHTML = 'THE WEBSITE HAS LAUNCHED';
    }
  

}
calculateTime();
setInterval(() => {
  calculateTime();
},1000);



