const searchFood = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    if(searchText == "") {
      alert("Please enter a search term");
      return;
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals));
  };
  
  const displaySearchResult = (meals) => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    if (meals.length == 0) {
      alert("No result found");
      return;
    }
    
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
          </div>
      </div>`;
      searchResult.appendChild(div);
    });
  };
  
  const loadMealDetail = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMealDetails(data.meals[0]));
  };
  
  const displayMealDetails = (meal) => {
    console.log(meal);
    const mealDetails = document.getElementById("meal-details");
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="row">
      <div class="col-md-4">
          <img src="${
            meal.strMealThumb
          }" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 900)}</p>
          <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          <a target="_blank" href="${
            meal.strYoutube
          }" class="btn btn-primary shadow-none">Go somewhere</a>
          </div>
      </div>
      </div>
      `;
    mealDetails.appendChild(div);
  };
  