export const fetchFoods = () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  .then(
    (response) => response.json().then((json) => {
      return response.ok ? Promise.resolve(json) : Promise.reject(json)
    })
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

  const re = /^strIngredient(\d*)$/;
  obj.ingredients = Object.entries(food).reduce((ing, [key, value],_, keys) => {
    const [, id] = key.match(re) || [];
    if (id) return [...ing, { ingredient: value, measure: keys[`strMeasure${id}`] || null }];
    return ing;
  }, []);
  return obj
};
