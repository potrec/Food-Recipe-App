const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const favoriteBtn = document.getElementById('favorite-btn');
// event listeners
if(searchBtn){
    searchBtn.addEventListener('click', getMealList);
}
if(mealList){
    mealList.addEventListener('click', getMealRecipe);
}

recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

if(favoriteBtn){
    favoriteBtn.addEventListener('click', getFavoriteMeal);
}
document.addEventListener('DOMContentLoaded', documentReady);


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        `
                        let isFavorite = JSON.parse(localStorage.getItem('meal'));
                        let found = false;
                        if(isFavorite){
                        isFavorite.forEach(element=>{
                            if(element.idMeal === meal.idMeal){
                            found=true;   
                            }                           
                        })
                        }
                        if(found){
                            html +=`
                            <a href = "#" class = "remove-btn" id="${meal.idMeal}" data-id = "${meal.idMeal}">Remove from favorite</a>
                            `
                        }
                        else{
                            html +=`
                            <a href = "#" class = "favorite-btn" id="${meal.idMeal}" data-id = "${meal.idMeal}">Add to favorite</a>
                            `
                        }
                html +=`
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        initializeRemoveBtn();

    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            // remove from favorite
            e.target.classList.remove('is-favorite');
        }
        else{
            // add to favorite
            e.target.classList.add('is-favorite');

            // Get info
            const cardBody = e.target.parentElement.parentElement;

            const mealInfo = {
                idMeal: cardBody.dataset.id,
                name: cardBody.querySelector('.meal-name h3').textContent,
                image: cardBody.querySelector('.meal-img img').src,
            }
            console.log(mealInfo);
            // Add into the storage
            saveIntoDB(mealInfo);
        }
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Save the recipes into local storage
function saveIntoDB(meal){
    const meals = getFromDB();

    meals.push(meal);

    // Add the new array into local storage
    localStorage.setItem('meal', JSON.stringify(meals));
}
// Return recipes from storage
function getFromDB(){
    let meal;

    if(localStorage.getItem('meal') === null){
        meal = [];
    } else
    {
        meal = JSON.parse(localStorage.getItem('meal'));
    }
    return meal
}

function getFavoriteMeal(){
    console.log();
}
// Document ready
function documentReady(){
   // When favorites page is loaded, get the recipes from local storage
   const favoriteTable = document.getElementById('favorites');
   if(favoriteTable){
    // Get the recipes from local storage
    const meals = getFromDB();
    // console.log(meals);
    // Display the recipes
    displayFavorite(meals);
    favoriteTable.addEventListener('click', (e)=>{
        // e.preventDefault();
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement;
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
                .then(response => response.json())
                .then(data => mealRecipeModal(data.meals));
        }
    })

   }
   initializeRemoveBtn();
}
function initializeRemoveBtn(){
    const removeBtn = document.getElementsByClassName('remove-btn');
    if(removeBtn){
        for(let i = 0; i < removeBtn.length; i++){
            let element = removeBtn[i];
            element.addEventListener('click', () => {
                let mealList = localStorage.getItem('meal');
                mealList = JSON.parse(mealList);
                mealList = mealList.filter(meal => meal.idMeal != element.id);
                // console.log(meal.idMeal);
                console.log(element.id);
                localStorage.setItem('meal', JSON.stringify(mealList));
                if(window.location.href.includes('favorite')){
                document.getElementById(element.id).remove();
                }    
            })
        }
        
    }
}


// Display favorite meal
function displayFavorite(favorites){
    const favoriteTable = document.getElementById('favorites');
    favorites.forEach(meal=>{
        const tr = document.createElement('tr');
            tr.innerHTML += `
                <td>
                    <img src = "${meal.image}" alt = "${meal.name}">
                </td>
                <td>${meal.name}</td>
                <td>
                <div class = "recipe-btn">Get Recipe</div>
                </td>
                <td>
                <div id="${meal.idMeal}" class = "remove-btn">Remove</div>
                </td>
            `;
            tr.setAttribute('id', meal.idMeal);
            
            favoriteTable.appendChild(tr);
        });
}

