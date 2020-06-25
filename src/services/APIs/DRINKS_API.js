export const fetchDrinks = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then(
    (response) => response.json().then((json) => {
      if (response.ok) return Promise.resolve(json);
      return Promise.reject(json);
    })
  )
);

// missing strDrinkAlternate, dateModified
export const handleDrinksData = ({
  idDrink,
  strDrink,
  strCategory,
  strInstructions,
  strArea,
  strDrinkThumb,
  strYoutube,
  strSource,
  ...food
}) => {
  const obj = {
    id: idDrink,
    name: strDrink,
    category: strCategory,
    instructions: strInstructions,
    origin: strArea,
    srcImage: strDrinkThumb,
    video: strYoutube,
    source: strSource,
  };

  const ingredientBase = /^strIngredient(\d*)$/;
  obj.ingredients = Object.entries(food).reduce((ing, [key, value], _, keys) => {
    const [, id] = key.match(ingredientBase) || [];
    if (id) return [...ing, { ingredient: value, measure: keys[`strMeasure${id}`] || null }];
    return ing;
  }, []);
  return obj;
};

