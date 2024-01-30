const btn=document.querySelector('.search-button');
const box=document.querySelector('.search-box');
const main=document.querySelector('.main-wala-div');
const closebtn=document.querySelector('.closebtn');
const closingDiv=document.querySelector('.closing-div');
const popupDiv=document.querySelector('.recipe-details-popup');
 
// function to search the data  by using fetch
const fetchrecipie=async (query)=>{
    main.innerHTML=("<h2>Fetching Recipe...</h2>");
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();//json() is used to convert javascript data to json data which is readable by us  
    main.innerHTML=("");
    response.meals.forEach(element => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipes')
        recipeDiv.innerHTML=`
        <img src=${element.strMealThumb}>
        <h3>${element.strMeal} Dish</h3>
        <p>${element.strArea} Dish</p>
        <p>Belongs to ${element.strCategory} Category</p>
        `
        const recipebtn=document.createElement('button');
        recipebtn.classList.add("recipe-btn")
        recipebtn.textContent="View Recipe";
        recipeDiv.appendChild(recipebtn);
        main.appendChild(recipeDiv); 
   //Adding event to the recipee button
        recipebtn.addEventListener('click',() =>{
            openrecipepopup(element);
        });
    });
}

const fetchIngredients= (meal)=>{
    console.log(meal);
    let IngredientList="";
     for (let i = 1; i <=20; i++) {
        const Ingredients = meal[`strIngredient${i}`];
        if(Ingredients){
            const measure=meal[`strMeasure${i}`];
             IngredientList +=`<li>${measure} ${Ingredients} </li>`
        }
        else{
            break;
        }
    }
    return IngredientList;

}
// const recipeWalaBtn=document.querySelector('recipe-btn');
const openrecipepopup=(element)=>{
    popupDiv.innerHTML=`
    <h2 class="names"> ${element.strMeal}</h2>
    <h3>Ingredients :</h3>
    <ul class="ingredient-List">${fetchIngredients(element)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="Instructions">${element.strInstructions}</p>
  </div>
    `
    
    popupDiv.parentElement.style.display="block";
}
closebtn.addEventListener('click',()=>{
    popupDiv.parentElement.style.display="none";
    
})
btn.addEventListener('click',(e)=>{
e.preventDefault();
// console.log("gtergfd")
const searchInput=box.value.trim();//taking value written in the input box 
fetchrecipie(searchInput); //calling the function to fetch the searched data 
});