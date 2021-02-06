const searchBtn = document.getElementById('search-btn');

const mealList = document.getElementById('meal');

const mealDetails = document.querySelector('.meal-details-content');

const exitBtn = document.getElementById('recipe-exit-btn');


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
exitBtn.addEventListener('click', () => {
    mealDetails.parentElement.classList.remove('showRecipe')
})
//Food list that matches with the searching Item.

function getMealList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    console.log(searchInputText.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            let str = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    str += `
                <div class="meal-item" data-id= " ${meal.idMeal}">
              <div class="meal-img">
                <img class="img" src="${meal.strMealThumb}" alt="">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipes</a>
              </div>
            </div>
                `;
                });

            }
            else {
                str = "SORRY! There is no food like this type of name."
                mealList.classList.add('Error-msg')
            }
            mealList.innerHTML = str;

        });
}

function getMealRecipe(e) {
    e.preventDefault();

    //console.log(e.target);
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipeModal(data.meals))
    }


}

function mealRecipeModal(meal) {
    meal = meal[0];
    let str1 = `
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <div class="recipe-instruct">
      <h3>Ingredients :</h3>
        <ol>
        <li>${meal.strMeasure1 + " " + meal.strIngredient1}</li>
        <li>${meal.strMeasure2 + " " + meal.strIngredient2} </li>
        <li>${meal.strMeasure3 + " " + meal.strIngredient3} </li>
        <li>${meal.strMeasure4 + " " + meal.strIngredient4}  </li>
        <li>${meal.strMeasure5 + " " + meal.strIngredient5} </li>
        <li>${meal.strMeasure6 + " " + meal.strIngredient6}</li>
        <li>${meal.strMeasure7 + " " + meal.strIngredient7}</li>
        <li>${meal.strMeasure8 + " " + meal.strIngredient8}</li>    
        </ol>
    </div>
    
    `;
    mealDetails.innerHTML = str1;
    mealDetails.parentElement.classList.add('showRecipe');
}