
const nameElement = document.querySelector('#name-container input');
const phoneElement = document.querySelector('#phone-container input');
const emailElement = document.querySelector('#email-container input');
const messageElement = document.querySelector('#message-container textarea');
const submitButton = document.querySelector('button');

nameElement.addEventListener('keyup', () => {
    checkName();
  });

phoneElement.addEventListener('keyup', () => {
  checkPhone();
})
emailElement.addEventListener('keyup', () => {
  checkEmail();
});
messageElement.addEventListener('keyup', () => {
  checkMessage();
})
submitButton.addEventListener('click', () => {
  if(!checkName()||!checkPhone()||!checkEmail()||!checkMessage()){
    document.querySelector('.button-container span')
      .innerHTML = 'Please fix the error';
  }
  else{
    nameElement.value = '';
    phoneElement.value = '';
    emailElement.value = '';
    messageElement.value = '';
    document.querySelector('.button-container span')
    .innerHTML = '';
    alert('the form was submitted successfully');
  }
});

function checkName() {
    const name = nameElement.value;
    const spanElement = document.querySelector('#name-container span');
    if(name.length === 0){
      spanElement.innerHTML = 'Name is required';
      return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
      spanElement.innerHTML = 'enter full name(letters Only)';
      return false;
    }
    spanElement.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
function checkPhone(){
    const phone = phoneElement.value;
    const spanElement = document.querySelector('#phone-container span');

    if(phone.length === 0){
      spanElement.innerHTML = 'Phone no is required';
      return false;
    }
    if(phone.length !== 10){
      spanElement.innerHTML = 'Phone no should be ten digits';
      return false;
    }
    if(!phone.match(/^[0-9]{10}$/)){
      spanElement.innerHTML = 'phone no is required';
      return false
    }
    spanElement.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
function checkEmail(){
  const email = emailElement.value;
  const spanElement = document.querySelector('#email-container span');

  if(email.length === 0){
    spanElement.innerHTML = 'Email is required';;
    return false;
  }
  if(!email.match(/^[A-Za-z0-9-.+]+@[A-Za-z]+\.[a-z]{2,4}$/)){
    spanElement.innerHTML = 'Proper Format is Required';
  return false;
  }
  spanElement.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}
function checkMessage(){
  const message = messageElement.value;
  const spanElement = document.querySelector('#message-container span');
  let left = 30 - message.length;

  if(left > 0){
    spanElement.innerHTML = `${left} characters remaining`;
    return false;
  }
  spanElement.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}