const percentage = document.getElementById('number');
let count = 0;
window.addEventListener('DOMContentLoaded',() => {
const id =  setInterval(() => {
      if(count !== 65){
        count++;
        percentage.innerHTML = count + '%';
      }
      else{
        clearInterval(id);
      }
    },20);

});