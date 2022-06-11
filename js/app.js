// Import Classes
import { UI } from './ui.js';
import { MealAPI } from './mealAPI.js';

// Instanciate the Classes
const ui = new UI();
const meal = new MealAPI();
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Create the Event Listeners
function eventListeners(){
 
    // Add the event listener when form is submitted
    const searchBtn = document.getElementById('search-btn');
    if(searchBtn){
        searchBtn.addEventListener('click', getMeals);
    }
    
}
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

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
        // Query by the name of the meal
        meal.getMealByName(searchTerm)
        .then(meals => {
            if(meals.meals.meals === null){
                //No meals found
                ui.printMessage('No meals found', 'danger');
            } else{
                ui.displayMealsWithIngredients(meals.meals.meals);
            }
        })
    }
}