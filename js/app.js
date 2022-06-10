// Instanciate the Classes
import { UI } from './ui.js';       
const ui = new UI();


// Create the Event Listeners
function eventListeners(){
 
    // Add the event listener when form is submitted
    const searchBtn = document.getElementById('search-btn');
    if(searchBtn){
        searchBtn.addEventListener('click', getMeals);
    }
    
}

eventListeners();

//Get meal list function
function getMeals(e){
    e.preventDefault();

    const searchTerm = document.querySelector('#search-input').value;

    //Check if the input isn't empty
    if(searchTerm === ''){
        //Show error message
        ui.printMessage('Please add something into the form', 'danger');
    }else{
        console.log('Query the REST API');
    }
}