export class UI {

    // Display the meals with ingredients
    displayMealsWithIngredients(meals){
        //Show the results
        const mealWrapper = document.querySelector('.meal-wrapper');

        // Insert the results
        const resultsDiv = document.querySelector('.meal-result');

        meals.forEach(drink => {
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

}   