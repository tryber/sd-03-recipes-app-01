export async function fetchFoodsApi(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${query}`);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export const fetchDetailsFood = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json().then((json) => {
      if (response.ok) return Promise.resolve(json);
      return Promise.reject(json);
    }),
  )
);

// missing strDrinkAlternate, dateModified
export const handleFoodsData = ({
  idMeal,
  strMeal,
  strCategory,
  strInstructions,
  strArea,
  strMealThumb,
  strYoutube,
  strSource,
  ...food
}) => {
  const obj = {
    id: idMeal,
    name: strMeal,
    category: strCategory,
    instructions: strInstructions,
    origin: strArea,
    srcImage: strMealThumb,
    video: strYoutube,
    source: strSource,
  };

  const ingredientBase = /^strIngredient(\d*)$/;
  obj.ingredients = Object.entries(food).reduce((ing, [key, value]) => {
    const [, id] = key.match(ingredientBase) || [];
    if (id && value !== '') {
      return [...ing, { ingredient: value, measure: food[`strMeasure${id}`] || null }];
    }
    return ing;
  }, []);
  return obj;
};

export async function fetchCategoriesApi() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export const handleCategoriesData = ({ strCategory }) => ({ category: strCategory });
