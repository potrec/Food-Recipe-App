export class MealAPI{
    async getMealByName(name){
        // Search by name
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a json responses
        const meals = await apiResponse.json();

        return{
            meals
        }
    }
}