const apiBase= "https://www.themealdb.com/api/json/v1/1/"
const button = document.getElementById('btn-search');
const showMeal = document.getElementById('mealName');
const showResult = document.getElementById('mealList');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('search-meal').value;
    loadData(userInput);
});

//Search Button function

function loadData(userInput) {
    let url = "";

    if (userInput.length === 0) {
        url = `${apiBase}search.php?f=${userInput}`;
        showMeal.innerHTML = null;
        showResult.innerHTML = null;
        return alert('Please Input any food name');
    } 
    else {
        url = `${apiBase}search.php?s=${userInput}`;
        showMeal.innerHTML = null;
        showResult.innerHTML = null;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
        displayData(data)
        })
}


//food display
const displayData = data => {
    data.meals.forEach(element => {
        const div = document.createElement('div');
        const mealIntro = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body text-center">
                    <h5 class="card-title mx-auto ">${element.strMeal}</h5>
                    <button onclick="ingredientDetails('${element.strMeal}')" class="bg-warning text-dark p-2">Ingredients</button>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealIntro;
        showMeal.appendChild(div);
    });
}

//food Details
const ingredientDetails = (details) => {
    url = `${apiBase}search.php?s=${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showResult.style.display = "block"
            const div = document.createElement('div');
            let element;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];

                if (details === element.strMeal) {
                    mealInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                    </ul>
                    </div> `;
                }
            }
            div.innerHTML = mealInfo;
            showResult.appendChild(div);
        });
   
        showResult.innerHTML = null;
}