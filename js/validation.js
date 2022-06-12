//Get data
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const message= document.querySelector('#message');
const succec = document.querySelector('#success');
const errorNodes = document.querySelectorAll('.error');

//Validate data
function validateForm() {
    clearMessages();
    let errorFlag = false;
    if(nameInput.value.length < 1){
        errorNodes[0].innerText = 'Name is required';
        nameInput.classList.add('error-border');
        errorFlag = true;
    }
    if(!emailIsValid(email.value)){
        errorNodes[1].innerText = 'Invalid email address';
        email.classList.add('error-border');
        errorFlag = true;
    }
    if(message.value.length < 1){
        errorNodes[2].innerText = 'Message is required';
        message.classList.add('error-border');
        errorFlag = true;
    }

    if(!errorFlag){
        succec.innerText = 'Succes! Your message has been sent';
    }
}

//Clear error/success messages
function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    succec.innerText = "";
    nameInput.classList.remove('error-border');
    email.classList.remove('error-border');
    message.classList.remove('error-border');
}

function emailIsValid(email) {
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}