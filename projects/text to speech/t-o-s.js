let speech = new SpeechSynthesisUtterance();
console.log(speech);

let tones=[];

let selectElement = document.querySelector('select');
const textElement = document.querySelector('textarea');

window.speechSynthesis.onvoiceschanged = () => {
  tones = window.speechSynthesis.getVoices();
  speech.voice = tones[0];

  tones.forEach((tone,index) => {
    selectElement.options[index] = new Option(tone.name,index);
    console.log(tone.name);
    console.log(selectElement.options[index]);
  })
};

selectElement.addEventListener('change', () => {
  speech.voice = tones[selectElement.value];
})

document.querySelector('button')
  .addEventListener('click', () => {
    speech.text = textElement.value;
    console.log(speech);
    window.speechSynthesis.speak(speech);
  });