export class UI {

    // Display the meals with ingredients
    displayMealsWithIngredients(meals){
        //Show the results
        const mealWrapper = document.querySelector('.meal-wrapper');

        // Insert the results
        const resultsDiv = document.querySelector('.meal-result');

        meals.forEach(meal => {
            resultsDiv.innerHTML += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "favorite-btn">Add to favorite</a>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
          `;  
        })

    }
    // Print message
    printMessage(message,className){
        const div = document.createElement('div');
    //ADD the HTML
    div.innerHTML = `
        <div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${message}
        </div>
        `;

        // Insert before

        const reference = document.querySelector('.meal-search h2');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div,reference);

        //Remove the alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();

        }, 3000);
    }
    // get recipe of the meal
    getMealRecipe(e){
        console.log(meals);
        e.preventDefault();
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(meals => mealRecipeModal(meals.meals.meals));}
    }
    // Create a modal
    mealRecipeModal(meals){
        console.log(meals);
        meals = meals[0];
        let html = `
            <h2 class = "recipe-title">${meals.strMeal}</h2>
            <p class = "recipe-category">${meals.strCategory}</p>
            <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meals.strInstructions}</p>
            </div>
            <div class = "recipe-meal-img">
                <img src = "${meals.strMealThumb}" alt = "">
            </div>
            <div class = "recipe-link">
                <a href = "${meals.strYoutube}" target = "_blank">Watch Video</a>
            </div>
        `;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
    }
}   